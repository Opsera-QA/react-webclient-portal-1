import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table";
import { faTimesCircle, faCheckCircle, faSearchPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { DropdownList } from "react-widgets";
import { createFilterOptionList } from "utils/tableHelpers";
import ModalActivityLogs from "components/common/modalActivityLogs";

function PipelineActivityLogTable({ data, isLoading, paginationOptions }) {
  const [filterOptionList, setFilterOptionList] = useState([]);
  const [filterOption, setFilterOption] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "run_count",
        desc: true
      },
      {
        id: "createdAt",
        desc: true
      }
    ]
  };  
  const noDataMessage = "Pipeline activity data has not been generated yet.  Once this pipeline begins running, it will publish details here.";

  useEffect(() => {    
    {data && data.length > 0 && setFilterOptionList(createFilterOptionList(data, "run_count", "run_count", "run_count", false));}
  }, []);
  
  const updateFilterOption = (filterOption) => {
    setFilterOption(filterOption);
  };

  const getRowInfo = (row) => {
    setModalData(row);
    setShowModal(true);
  };

  const rowStyling = (row) => {
    // TODO: if we want alternate colors for failure rows, do it here
    // return (row["values"].status === "failure" || row["values"].status === "failed") ? " failure-row" : "";
  };

  const selectRow = (rows, row, index) => {
    return row["values"].action !== "automation task" ? getRowInfo(rows["data"][index]) : null;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Run",
        accessor: "run_count",
        class: "cell-center"
      },
      {
        Header: "Action",
        accessor: "action",
      },
      {
        Header: "Task",
        accessor: "step_name",
      },
      {
        Header: "Tool",
        accessor: "tool_identifier"
      },      
      {
        Header: "Status",
        accessor: "status",
        Cell: (props) => {
          return props.value ? 
            (props.value === "failure" || props.value === "failed") 
              ? <><FontAwesomeIcon icon={faTimesCircle} className="cell-icon red" /><span className="pl-2">{props.value}</span></>
              : <><FontAwesomeIcon icon={faCheckCircle} className="cell-icon green" /><span className="pl-2">{props.value}</span></>
            : "unknown";
        },
      },
      {
        Header: "Message",
        accessor: "message",
      },
      {
        Header: "Created",
        accessor: "createdAt",
        Cell: (props) => {
          return format(new Date(props.value), "yyyy-MM-dd', 'hh:mm a");
        },
        class: "cell-center"
      },
      {
        Header: "Info",
        accessor: "row",
        Cell: (props) => {
          return props["row"]["values"].action !== "automation task" ? 
            <FontAwesomeIcon icon={faSearchPlus}
              style={{ cursor: "pointer" }}
              onClick= {() => { selectRow(props, props.row, props.row["index"]); }} /> : null; 
        },
        class: "cell-center"
      },
    ],
    []
  );

  return (
    <>
      <ModalActivityLogs header="Pipeline Activity Log" size="lg" jsonData={modalData} show={showModal} setParentVisibility={setShowModal} />
      { isLoading 
        ? <div className="h6 mt-4">Activity Log<FontAwesomeIcon icon={faSpinner} spin className="ml-1" fixedWidth/></div> 
        : 
        <>
          <div className="my-1 d-flex justify-content-between">
            <div className="h6 mt-2 d-flex">Activity Log</div>
            <div className="tool-filter">
              { filterOptionList && <DropdownList
                busy={Object.keys(filterOptionList).length == 1 ? true : false}
                disabled={Object.keys(filterOptionList).length == 1 ? true : false}
                data={filterOptionList}
                valueField='filterText'
                textField='text'
                defaultValue={filterOption}
                onChange={updateFilterOption}             
              ></DropdownList>
              }   
            </div>
          </div>
          {data && data.length > 0 
            && <>
              <CustomTable 
                columns={columns} 
                data={data}
                rowStyling={rowStyling}
                noDataMessage={noDataMessage}
                initialState={initialState}
                tableFilter={filterOption}
                paginationOptions={paginationOptions}
              >
              </CustomTable>
            </>}
        </>}
    </>
  );
}

PipelineActivityLogTable.propTypes = {
  data: PropTypes.array,
  paginationOptions: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default PipelineActivityLogTable;