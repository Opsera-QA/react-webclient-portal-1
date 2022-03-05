import React, {useMemo, useContext} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getFormattedLabelWithFunctionColumnDefinition,
  getLimitedTableTextColumn,
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import notificationsMetadata from "./notifications-metadata";
import {useHistory} from "react-router-dom";
import { getField } from "components/common/metadata/metadata-helpers";
import {faFlag} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import NotificationTypeFilter from "components/common/filters/notifications/notification_type/NotificationTypeFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import InlineNotificationTypeFilter
  from "components/common/filters/notifications/notification_type/InlineNotificationTypeFilter";
import NewNotificationOverlay from "components/notifications/NewNotificationOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import {getNotificationTypeLabel} from "components/common/list_of_values_input/notifications/type/notificationTypes.constants";

function NotificationsTable(
  {
    data,
    notificationFilterDto,
    setNotificationFilterDto,
    loadData,
    isLoading,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  let history = useHistory();
  const fields = notificationsMetadata.fields;

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
      getFormattedLabelWithFunctionColumnDefinition(getField(fields, "type"), getNotificationTypeLabel),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt";})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active";})),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push(`/notifications/details/${rowData.original._id}`);
  };

  const getDropdownFilters = () => {
    return (
      <>
        <ActiveFilter filterDto={notificationFilterDto} setFilterDto={setNotificationFilterDto} className="mb-2" />
        <NotificationTypeFilter filterDto={notificationFilterDto} setFilterDto={setNotificationFilterDto} className="mb-2" />
        <TagFilter filterDto={notificationFilterDto} setFilterDto={setNotificationFilterDto} />
      </>
    );
  };

  const getInlineFilters = () => {
    return (
      <InlineNotificationTypeFilter
        filterModel={notificationFilterDto}
        setFilterModel={setNotificationFilterDto}
        loadData={loadData}
        className={"mr-2"}
      />
    );
  };

  const createNewNotification = () => {
    toastContext.showOverlayPanel(<NewNotificationOverlay loadData={loadData} isMounted={isMounted} />);
  };

  const getNotificationTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        paginationDto={notificationFilterDto}
        setPaginationDto={setNotificationFilterDto}
        rowStyling={rowStyling}
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      className="px-2 pb-2"
      loadData={loadData}
      filterDto={notificationFilterDto}
      setFilterDto={setNotificationFilterDto}
      addRecordFunction={createNewNotification}
      inlineFilters={getInlineFilters()}
      supportSearch={true}
      isLoading={isLoading}
      body={getNotificationTable()}
      dropdownFilters={getDropdownFilters()}
      titleIcon={faFlag}
      title={"Notification Policies"}
    />
  );
}

NotificationsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  notificationFilterDto: PropTypes.object,
  setNotificationFilterDto: PropTypes.func,
  isMounted: PropTypes.object,
};

export default NotificationsTable;