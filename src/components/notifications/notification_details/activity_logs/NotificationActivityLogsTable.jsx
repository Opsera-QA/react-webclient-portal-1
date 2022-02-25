import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableBooleanIconColumn,
  getTableDateTimeColumn, getTableInfoIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import notificationActivityLogMetadata
  from "components/notifications/notification_details/activity_logs/notification-activity-log-metadata";
import ModalActivityLogsDialog from "components/common/modal/modalActivityLogs";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import NotificationTypeFilter from "components/common/filters/notifications/notification_type/NotificationTypeFilter";
import FilterContainer from "components/common/table/FilterContainer";
import {faTable} from "@fortawesome/pro-light-svg-icons";

function NotificationActivityLogsTable(
  {
    notificationActivityFilterDto,
    setNotificationActivityFilterDto,
    notificationActivityLogs,
    isLoading,
    loadData,
  }) {
  let fields = notificationActivityLogMetadata.fields;
  const [showModal, setShowModal] = useState(false);
  // TODO: Use new overlay
  const [modalData, setModalData] = useState({});

  const showActivityLog = (row) => {
    setModalData(row);
    setShowModal(true);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "type";})),
      getTableTextColumn(fields.find(field => { return field.id === "message";})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "status";})),
      getTableDateTimeColumn(fields.find(field => { return field.id === "createdAt";})),
      getTableInfoIconColumn(showActivityLog),
    ],
    [],
  );

  const getDropdownFilters = () => {
    return (
      <>
        <ActiveFilter filterDto={notificationActivityFilterDto} setFilterDto={setNotificationActivityFilterDto} className={"mb-2"} />
        <NotificationTypeFilter filterDto={notificationActivityFilterDto} setFilterDto={setNotificationActivityFilterDto} className={"mb-2"}/>
        <TagFilter filterDto={notificationActivityFilterDto} setFilterDto={setNotificationActivityFilterDto} />
      </>
    );
  };

  const getNotificationActivityLogsTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        columns={columns}
        data={notificationActivityLogs}
        isLoading={isLoading}
        paginationDto={notificationActivityFilterDto}
        setPaginationDto={setNotificationActivityFilterDto}
        loadData={loadData}
      />
    );
  };

  return (
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        isLoading={isLoading}
        body={getNotificationActivityLogsTable()}
        filterDto={notificationActivityFilterDto}
        setFilterDto={setNotificationActivityFilterDto}
        supportSearch={true}
        dropdownFilters={getDropdownFilters()}
        titleIcon={faTable}
        title={"Policy Activity Logs"}
      />
      <ModalActivityLogsDialog size={"lg"} header={"Policy Activity Log"} jsonData={modalData} show={showModal} setParentVisibility={setShowModal} />
    </div>
  );
}

NotificationActivityLogsTable.propTypes = {
  notificationActivityFilterDto: PropTypes.object,
  setNotificationActivityFilterDto: PropTypes.func,
  notificationActivityLogs: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,

};

export default NotificationActivityLogsTable;
