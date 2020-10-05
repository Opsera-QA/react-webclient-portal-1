import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { faTimesCircle, faCheckCircle, faSearchPlus, faStopCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import ModalActivityLogs from "components/common/modal/modalActivityLogs";
import simpleNumberLocalizer from "react-widgets-simple-number";

function PipelineActivityLogTable({ data, isLoading, paginationOptions, selectRunCountFilter, currentRunCountFilter, maxRunCount }) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "run_count",
        desc: true,
      },
      {
        id: "createdAt",
        desc: true,
      },
    ],
  };
  const noDataMessage = "Pipeline activity data has not been generated yet. Once this pipeline begins running, it will publish details here.";

  simpleNumberLocalizer();

  // useEffect(() => {}, []);

  const getRowInfo = (row) => {
    setModalData(row);
    setShowModal(true);
  };

  const rowStyling = (row) => {
    // TODO: if we want alternate colors for failure rows, do it here
    return "";
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
        class: "cell-center no-wrap-inline",
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
        accessor: "tool_identifier",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (props) => {
          switch (props.value) {
          case "failure":
          case "failed":
            return (<>
              <div className="d-flex flex-nowrap">
                <div><FontAwesomeIcon icon={faTimesCircle} className="cell-icon red vertical-align-item" fixedWidth /></div>
                <div className="ml-1">{props.value}</div>
              </div>
            </>);

          case "unknown":
            return (<>
              <div className="d-flex flex-nowrap">
                <div><FontAwesomeIcon icon={faCheckCircle} className="cell-icon yellow vertical-align-item" fixedWidth/></div>
                <div className="ml-1">{props.value}</div>
              </div>
            </>);

          case "rejected":
            return (<>
              <div className="d-flex flex-nowrap">
                <div><FontAwesomeIcon icon={faStopCircle} className="cell-icon red vertical-align-item" fixedWidth/></div>
                <div className="ml-1">{props.value}</div>
              </div>
            </>);

          default:
            return (<>
              <div className="d-flex flex-nowrap">
                <div><FontAwesomeIcon icon={faCheckCircle} className="cell-icon green vertical-align-item" fixedWidth/></div>
                <div className="ml-1">{props.value}</div>
              </div>
            </>);
          }

          /*return props.value ?
            (props.value === "failure" || props.value === "failed")
              ? <><div className="d-flex flex-nowrap"><div><FontAwesomeIcon icon={faTimesCircle} className="cell-icon red" /></div><div className="ml-1">{props.value}</div></div></>
              : <><div className="d-flex flex-nowrap"><div><FontAwesomeIcon icon={faCheckCircle} className="cell-icon green" /></div><div className="ml-1">{props.value}</div></div></>
            : "unknown";*/
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
        class: "cell-center no-wrap-inline",
      },
      {
        Header: "Info",
        accessor: "row",
        Cell: (props) => {
          return props["row"]["values"].action !== "automation task" ?
            <FontAwesomeIcon icon={faSearchPlus}
                             style={{ cursor: "pointer" }}
                             onClick={() => {
                               selectRow(props, props.row, props.row["index"]);
                             }}/> : null;
        },
        class: "cell-center",
      },
    ],
    [],
  );

  return (
    <>
      <ModalActivityLogs header="Pipeline Activity Log" size="lg" jsonData={modalData} show={showModal}
                         setParentVisibility={setShowModal}/>
      <>
        <div className="mt-1 d-flex justify-content-between">
          <div className="custom-table-filter pipeline-activity-filter">
            {/*<NumberPicker*/}
            {/*    type="number"*/}
            {/*    placeholder={"Run Count"}*/}
            {/*    // disabled={maxRunCount ? maxRunCount < 2 : false}*/}
            {/*    value={currentRunCountFilter ? currentRunCountFilter : 1}*/}
            {/*    className="max-content-width"*/}
            {/*    onChange={selectRunCountFilter}*/}
            {/*    min={1}*/}
            {/*    // max={maxRunCount}*/}
            {/*    />*/}
          </div>
        </div>
        <CustomTable
          columns={columns}
          data={data}
          rowStyling={rowStyling}
          isLoading={isLoading}
          noDataMessage={noDataMessage}
          initialState={initialState}
          tableTitle={"Pipeline Activity Logs"}
          paginationOptions={paginationOptions}
        />
      </>
    </>
  );
}

PipelineActivityLogTable.propTypes = {
  data: PropTypes.array,
  paginationOptions: PropTypes.object,
  isLoading: PropTypes.bool,
  selectRunCountFilter: PropTypes.func,
  currentRunCountFilter: PropTypes.number,
  maxRunCount: PropTypes.number,
};

export default PipelineActivityLogTable;