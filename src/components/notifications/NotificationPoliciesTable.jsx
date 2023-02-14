import React, {useMemo, useContext} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getFormattedLabelWithFunctionColumnDefinition,
  getLimitedTableTextColumn, getOwnerNameField,
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {useHistory} from "react-router-dom";
import { getField } from "components/common/metadata/metadata-helpers";
import {faFlag} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import NotificationTypeFilter from "components/common/filters/notifications/notification_type/NotificationTypeFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import InlineNotificationTypeFilter
  from "components/common/filters/notifications/notification_type/InlineNotificationTypeFilter";
import NewNotificationPolicyOverlay from "components/notifications/NewNotificationPolicyOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import {getNotificationTypeLabel} from "components/common/list_of_values_input/notifications/type/notificationTypes.constants";
import {notificationPolicyHelper} from "hooks/notification_policies/notificationPolicy.helper";
import notificationPolicyMetadata
  from "@opsera/definitions/constants/notification_policies/notificationPolicy.metadata";

function NotificationPoliciesTable(
  {
    data,
    notificationFilterDto,
    setNotificationFilterDto,
    loadData,
    isLoading,
  }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const fields = notificationPolicyMetadata.fields;

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getOwnerNameField(),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
      getFormattedLabelWithFunctionColumnDefinition(getField(fields, "type"), getNotificationTypeLabel),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push(notificationPolicyHelper.getDetailViewLink(rowData.original._id));
  };

  const getDropdownFilters = () => {
    return (
      <>
        <ActiveFilter
          filterDto={notificationFilterDto}
          setFilterDto={setNotificationFilterDto}
          className={"mb-2"}
        />
        <NotificationTypeFilter
          filterDto={notificationFilterDto}
          setFilterDto={setNotificationFilterDto}
          className={"mb-2"}
        />
        <TagFilter
          filterDto={notificationFilterDto}
          setFilterDto={setNotificationFilterDto}
        />
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
    toastContext.showOverlayPanel(
      <NewNotificationPolicyOverlay
        loadData={loadData}
      />
    );
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
      className={"px-2 pb-2"}
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

NotificationPoliciesTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  notificationFilterDto: PropTypes.object,
  setNotificationFilterDto: PropTypes.func,
};

export default NotificationPoliciesTable;