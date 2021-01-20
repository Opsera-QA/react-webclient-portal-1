import React, { useMemo, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import CustomTable from "components/common/table/CustomTable";
import { AuthContext } from "contexts/AuthContext";
import {
  getTableBooleanIconColumn,
  getTableDateColumn, getTableInfoIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import notificationActivityLogMetadata
  from "components/notifications/notification_details/activity_logs/notification-activity-log-metadata";
import ModalActivityLogsDialog from "components/common/modal/modalActivityLogs";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import notificationsActions from "components/notifications/notifications-actions";

function NotificationActivityLogsTable({ notificationData }) {
  let fields = notificationActivityLogMetadata.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [logCount, setLogCount] = useState(0);
  const [logData, setLogData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [isLoading, setIsLoading] = useState(true);

  const initialState = {
    pageIndex: 0,
  };

  const showActivityLog = (row) => {
    setModalData(row);
    setShowModal(true);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "type"})),
      getTableTextColumn(fields.find(field => { return field.id === "message"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "status"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      getTableInfoIconColumn(showActivityLog),
    ],
    [],
  );

  // Executed every time page number or page size changes
  useEffect(() => {
    getNotificationLogs();
  }, [currentPage, pageSize]);

  const getNotificationLogs = async () => {
    try {
      setIsLoading(true)
      const notificationLogResponse = await notificationsActions.getNotificationActivityLogs(notificationData, currentPage, pageSize, getAccessToken);

      if (notificationLogResponse?.data) {
        setLogCount(notificationLogResponse.data.count);
        setLogData(notificationLogResponse.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
    finally {
      setIsLoading(false)
    }
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
    <DetailPanelContainer>
      <div className="h6">Policy Activity Logs</div>
      <div className="mb-3 text-muted">View log activity for notifications performed by Opsera against this policy.</div>
      <CustomTable
        columns={columns}
        data={logData}
        initialState={initialState}
        isLoading={isLoading}
        paginationOptions={getPaginationOptions()}
      />
      <ModalActivityLogsDialog size={"lg"} header={"Policy Activity Log"} jsonData={modalData} show={showModal} setParentVisibility={setShowModal} />
    </DetailPanelContainer>
  );
}

NotificationActivityLogsTable.propTypes = {
  notificationData: PropTypes.object,
};


export default NotificationActivityLogsTable;
