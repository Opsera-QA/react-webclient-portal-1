import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import { faUsers } from "@fortawesome/pro-light-svg-icons";
import { ssoUserMetadata } from "components/settings/users/ssoUser.metadata";

export default function FreeTrialCustomerWorkspaceUsersTable(
  {
    ssoUsers,
    loadData,
    isLoading,
  }) {
  const fields = ssoUserMetadata.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "firstName")),
      getTableTextColumn(getField(fields, "lastName")),
      getTableTextColumn(getField(fields, "attributes.company")),
      getTableTextColumn(getField(fields, "domain")),
      getTableTextColumn(getField(fields, "email")),
      getTableDateTimeColumn(getField(fields, "createdAt")),
    ],
    [fields]
  );

  const onRowSelect = (rowData) => {
    history.push(`/admin/customer/workspaces/user/${rowData.original._id}`);
  };

  const getTable = () => {
    return (
      <CustomTable
        onRowSelect={onRowSelect}
        isLoading={isLoading}
        data={ssoUsers}
        columns={columns}
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getTable()}
      supportSearch={true}
      titleIcon={faUsers}
      title={"Free Trial Users"}
      className={"px-2 pb-2"}
    />
  );
}

FreeTrialCustomerWorkspaceUsersTable.propTypes = {
  ssoUsers: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
};
