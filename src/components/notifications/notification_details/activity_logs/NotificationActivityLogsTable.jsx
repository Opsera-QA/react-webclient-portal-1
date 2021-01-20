import React, { useMemo, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
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
import Model from "core/data_model/model";
import notificationActivityLogFilterMetadata
  from "components/notifications/notification_details/activity_logs/notifications-activity-log-filter-metadata";

function NotificationActivityLogsTable({ notificationData }) {
  let fields = notificationActivityLogMetadata.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [logData, setLogData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [notificationActivityFilterDto, setNotificationActivityFilterDto] = useState(new Model({...notificationActivityLogFilterMetadata.newObjectFields}, notificationActivityLogFilterMetadata, false));

  useEffect(() => {
    loadData();
  }, []);

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

  const loadData = async (filterDto = notificationActivityFilterDto) => {
    try {
      setIsLoading(true)
      const notificationLogResponse = await notificationsActions.getNotificationActivityLogs(notificationData, filterDto, getAccessToken);

      if (notificationLogResponse?.data) {
        setLogData(notificationLogResponse.data.data);

        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", notificationLogResponse.data.count);
        newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters())
        setNotificationActivityFilterDto({...newFilterDto});
      }
    } catch (error) {
      console.log(error.message);
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <DetailPanelContainer>
      <div className="mb-3 text-muted">View log activity for notifications performed by Opsera against this policy.</div>
      <CustomTable
        columns={columns}
        data={logData}
        initialState={initialState}
        isLoading={isLoading}
        paginationDto={notificationActivityFilterDto}
        setPaginationDto={setNotificationActivityFilterDto}
        loadData={loadData}
        tableTitle={"Policy Activity Logs"}
      />
      <ModalActivityLogsDialog size={"lg"} header={"Policy Activity Log"} jsonData={modalData} show={showModal} setParentVisibility={setShowModal} />
    </DetailPanelContainer>
  );
}

NotificationActivityLogsTable.propTypes = {
  notificationData: PropTypes.object,
};

export default NotificationActivityLogsTable;
