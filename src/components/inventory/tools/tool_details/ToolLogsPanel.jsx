import React, { useMemo, useState, useEffect, useContext } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types"; 
import { axiosApiService } from "api/apiService";
import CustomTable from "components/common/table/table";
import { faTimesCircle, faCheckCircle, faSearchPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import ReactJson from "react-json-view";
import "components/inventory/tools/tools.css";

function ToolLogsPanel(props) {
  const { toolData, accessToken } = props;
  const [logCount, setLogCount] = useState(0);
  const [logData, setLogData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

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

  const columns = useMemo(
    () => [
      /*{
        Header: "Run",
        accessor: "run_count",
        class: "cell-center no-wrap-inline"
      },*/
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
              ? <><div style={{ display: "flex",  flexWrap: "nowrap" }}><div><FontAwesomeIcon icon={faTimesCircle} className="cell-icon red" /></div><div className="ml-1">{props.value}</div></div></>
              : <><div style={{ display: "flex",  flexWrap: "nowrap" }}><div><FontAwesomeIcon icon={faCheckCircle} className="cell-icon green" /></div><div className="ml-1">{props.value}</div></div></>
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
        class: "no-wrap-inline"
      },
      {
        Header: "Info",
        accessor: "row",
        Cell: (props) => {
          return props["row"]["values"].action !== "automation task" ? 
            <FontAwesomeIcon icon={faSearchPlus}
              style={{ cursor: "pointer" }}
              onClick= {() => { selectRow(props, props.row, props.row["index"]); }} /> : null;
        }
      },
    ],
    []
  );  

  // Executed every time page number or page size changes
  useEffect(() => {    
    getToolLog();
  }, [currentPage, pageSize]);

  const getToolLog = async () => {
    try {
      const apiUrl = `/registry/log/${toolData.getData("_id")}?page=${currentPage}&size=${pageSize}`;
      const tool_logs = await axiosApiService(accessToken).get(apiUrl, {});
      setLogCount(tool_logs.data.count);
      setLogData(tool_logs.data.data);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const getRowInfo = (row) => {
    setModalData(row);
    setShowModal(true);
  };

  const selectRow = (rows, row, index) => {
    return row["values"].action !== "automation task" ? getRowInfo(rows["data"][index]) : null;
  };

  const getPaginationOptions = () => {
    return {
      pageSize: pageSize,
      totalCount: logCount,
      currentPage: currentPage,
      gotoPageFn: gotoPage
    };
  };

  const gotoPage = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  return (
    <>
      <div className="table-content-block">
        <CustomTable
          columns={columns}
          data={logData}
          initialState={initialState}
          paginationOptions={getPaginationOptions()}
          tableStyleName="custom-table-2"
        >
        </CustomTable>
      </div>
      <Modal show={showModal} size="lg" onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tool Details Log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-3">
            <ReactJson src={modalData} displayDataTypes={false}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ToolLogsPanel.propTypes = {
  toolId: PropTypes.string,
  toolData: PropTypes.object,
  accessToken: PropTypes.string
};


export default ToolLogsPanel;
