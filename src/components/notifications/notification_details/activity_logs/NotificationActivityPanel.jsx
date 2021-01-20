import React, { useMemo, useState, useEffect, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import CustomTable from "components/common/table/CustomTable";
import { faTimesCircle, faCheckCircle, faSearchPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import ReactJson from "react-json-view";
import { AuthContext } from "contexts/AuthContext";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import notificationActivityLogMetadata
  from "components/notifications/notification_details/activity_logs/notification-activity-log-metadata";

function NotificationActivityPanel({ notificationData }) {
  let fields = notificationActivityLogMetadata.fields;
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
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "type"})),
      getTableTextColumn(fields.find(field => { return field.id === "message"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "status"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
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
      },
    ],
    [],
  );

  // Executed every time page number or page size changes
  useEffect(() => {
    getToolLog();
  }, [currentPage, pageSize]);

  const getToolLog = async () => {
    isLoading(true)
    try {
      const accessToken = await getAccessToken();
      const apiUrl = `/notifications/logs/${notificationData.getData("_id")}?page=${currentPage}&size=${pageSize}`;
      const tool_logs = await axiosApiService(accessToken).get(apiUrl, {});
      setLogCount(tool_logs.data.count);
      setLogData(tool_logs.data.data);
    } catch (err) {
      console.log(err.message);
    }
    isLoading(false)
  };

  const getRowInfo = (row) => {
    setModalData(row);
    setShowModal(true);
  };

  const selectRow = (rows, row, index) => {
    return getRowInfo(rows["data"][index]);
  };

  // TODO: Wire up new pagination
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
    <div className="text-muted p-3">
      <div className="h6">Policy Activity Logs</div>
      <div className="mb-3">View log activity for notifications performed by Opsera against this policy.
      </div>
      <CustomTable
        columns={columns}
        data={logData}
        initialState={initialState}
        isLoading={loading}
        paginationOptions={getPaginationOptions()}
      />
      <Modal show={showModal} size="lg" onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Activity Log Details</Modal.Title>
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
    </div>
  );
}

NotificationActivityPanel.propTypes = {
  notificationData: PropTypes.object,
};


export default NotificationActivityPanel;
