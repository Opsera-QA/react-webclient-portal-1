import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import notificationsMetadata from "./notifications-metadata";
import {useHistory} from "react-router-dom";

function NotificationsTable({ data, notificationFilterDto, setNotificationFilterDto, loadData, isLoading }) {
  let history = useHistory();
  const fields = notificationsMetadata.fields;

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableTextColumn(fields.find(field => { return field.id === "type"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active"})),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push(`/notifications/details/${rowData.original._id}`);
  };

  return (
    <CustomTable
      className={"no-table-border"}
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
}

NotificationsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  notificationFilterDto: PropTypes.object,
  setNotificationFilterDto: PropTypes.func,
};

export default NotificationsTable;