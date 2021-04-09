import React, { useMemo, useState, useEffect, useContext } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import CustomTable from "components/common/table/CustomTable";
import { faTimesCircle, faCheckCircle, faSearchPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import ReactJson from "react-json-view";
import "components/inventory/tools/tools.css";
import { AuthContext } from "contexts/AuthContext";


function ToolLogsPanel({ toolData, accessToken }) {
  const { getAccessToken } = useContext(AuthContext);
  const [logCount, setLogCount] = useState(0);
  const [logData, setLogData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [loading, isLoading] = useState(true);

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

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        accessor: "action",
        class: "upper-case-first"
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: function formatCell(row) {
          return row.value ?
            (row.value !== "success")
              ? <>
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <div><FontAwesomeIcon icon={faTimesCircle} className="cell-icon red"/></div>
                  <div className="ml-1">{row.value}</div>
                </div>
              </>
              : <>
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <div><FontAwesomeIcon icon={faCheckCircle} className="cell-icon green"/></div>
                  <div className="ml-1">{row.value}</div>
                </div>
              </>
            : "unknown";
        },
        class: "upper-case-first"
      },
      {
        Header: "Message",
        accessor: "message",
      },
      {
        Header: "Created",
        accessor: "createdAt",
        Cell: function formatCell(row) {
          return format(new Date(row.value), "yyyy-MM-dd', 'hh:mm a");
        },
        class: "no-wrap-inline",
      },
      {
        Header: "Info",
        accessor: "row",
        Cell: function formatCell(row) {
          return row["row"]["values"].action !== "automation task" ?
            <FontAwesomeIcon icon={faSearchPlus}
                             style={{ cursor: "pointer" }}
                             onClick={() => {
                               selectRow(row, row.row, row.row["index"]);
                             }}/> : null;
        },
      },
    ],
    [],
  );

  // Executed every time page number or page size changes
  useEffect(() => {
    getToolLog();
  }, [currentPage, pageSize]);

  const getToolLog = async () => {
    isLoading(true);
    try {
      const accessToken = await getAccessToken();
      const apiUrl = `/registry/log/${toolData.getData("_id")}?page=${currentPage}&size=${pageSize}`;
      const tool_logs = await axiosApiService(accessToken).get(apiUrl, {});
      setLogCount(tool_logs.data.count);
      setLogData(tool_logs.data.data);
    } catch (err) {
      console.log(err.message);
    }
    isLoading(false);
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
      gotoPageFn: gotoPage,
    };
  };

  const gotoPage = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  return (
    <>
      <div className="text-muted p-3">
        <div className="h6">Tool Management Logs</div>
        <div className="mb-3">View log activity for actions performed by Opsera against this tool. This includes
          creation or deletion of jobs as well as registering accounts.
        </div>
      {/*<div className="tool-filter mr-2">*/}
      {/*  { filterOptionList && <DropdownList*/}
      {/*    busy={Object.keys(filterOptionList).length === 1}*/}
      {/*    disabled={Object.keys(filterOptionList).length === 1}*/}
      {/*    data={filterOptionList}*/}
      {/*    valueField='filterText'*/}
      {/*    textField='text'*/}
      {/*    filter="contains"*/}
      {/*    defaultValue={tableFilter}*/}
      {/*    onChange={updateFilterOption}*/}
      {/*  />}*/}
      {/*</div>*/}
      <div className="table-content-block">
        <CustomTable
          columns={columns}
          data={logData}
          initialState={initialState}
          isLoading={loading}
          paginationOptions={getPaginationOptions()}
        >
        </CustomTable>
      </div>
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
  accessToken: PropTypes.string,
};


export default ToolLogsPanel;
