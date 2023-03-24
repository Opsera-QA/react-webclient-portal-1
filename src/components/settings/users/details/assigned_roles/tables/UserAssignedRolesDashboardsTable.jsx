import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getuserRoleLevelColumnDefinition,
  getTableTextColumn, getUserObjectRoleLevelColumnDefinition,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import { dashboardHelper } from "components/insights/dashboards/dashboard.helper";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import { useHistory } from "react-router-dom";

export default function UserAssignedRolesDashboardsTable(
  {
    user,
    dashboards,
    isLoading,
  }) {
  const history = useHistory();
  const fields = dashboardMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "_id")),
      getUserObjectRoleLevelColumnDefinition(user),
    ],
    [fields],
  );

  const onRowSelectFunction = (row, dataObject) => {
    history.push(dashboardHelper.getDetailViewLink(dataObject?._id));
  };

  return (
    <CustomTable
      isLoading={isLoading}
      onRowSelect={onRowSelectFunction}
      data={dashboards}
      columns={columns}
    />
  );
}

UserAssignedRolesDashboardsTable.propTypes = {
  dashboards: PropTypes.array,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
};