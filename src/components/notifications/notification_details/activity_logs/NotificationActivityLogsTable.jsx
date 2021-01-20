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

  const selectRow = (rowInfo) => {

    console.log("rowINfo: " + JSON.stringify(rowInfo));
    return getRowInfo(rowInfo);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "type"})),
      getTableTextColumn(fields.find(field => { return field.id === "message"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "status"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      getTableInfoIconColumn(selectRow),
    ],
    [],
  );

  // Executed every time page number or page size changes
  useEffect(() => {
    getToolLog();
  }, [currentPage, pageSize]);

  const getToolLog = async () => {
    try {
      setIsLoading(true)
      const accessToken = await getAccessToken();
      const apiUrl = `/notifications/logs/${notificationData.getData("_id")}?page=${currentPage}&size=${pageSize}`;
      const tool_logs = await axiosApiService(accessToken).get(apiUrl, {});
      setLogCount(tool_logs.data.count);
      setLogData(tool_logs.data.data);
    } catch (err) {
      console.log(err.message);
    }
    finally {
      setIsLoading(false)
    }
  };

  const getRowInfo = (row) => {
    setModalData(row);
    setShowModal(true);
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
