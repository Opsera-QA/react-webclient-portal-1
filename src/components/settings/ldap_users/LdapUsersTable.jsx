import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {ldapUserMetadata} from "components/settings/ldap_users/ldapUser.metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faUser} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import NewOrganizationAccountUserOverlay
  from "components/admin/accounts/ldap/organization_accounts/NewOrganizationAccountUserOverlay";

function LdapUsersTable({ userData, orgDomain, isLoading, loadData }) {
  const fields = ldapUserMetadata.fields;
  const history = useHistory();
  const { toastContext } = useComponentStateReference();

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "preferredName";})),
      getTableTextColumn(fields.find(field => { return field.id === "firstName";})),
      getTableTextColumn(fields.find(field => { return field.id === "lastName";})),
      getTableTextColumn(fields.find(field => { return field.id === "emailAddress";})),
      getTableTextColumn(fields.find(field => { return field.id === "title";})),
      getTableTextColumn(fields.find(field => { return field.id === "departmentName";})),
      getTableTextColumn(fields.find(field => { return field.id === "division";})),
      getTableTextColumn(fields.find(field => { return field.id === "region";})),
    ],
    [fields]
  );

  const onRowSelect = (rowData) => {
    history.push(
      `/admin/organization-accounts/${orgDomain}/users/${rowData?.original?.emailAddress}/details`);
  };

  const createUser = () => {
    toastContext.showOverlayPanel(
      <NewOrganizationAccountUserOverlay
        loadData={loadData}
        orgDomain={orgDomain}
      />
    );
  };

  const getUsersTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={userData}
        columns={columns}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={createUser}
      isLoading={isLoading}
      body={getUsersTable()}
      titleIcon={faUser}
      title={"Users"}
      type={"User"}
    />
  );
}

LdapUsersTable.propTypes = {
  userData: PropTypes.array,
  orgDomain: PropTypes.string,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default LdapUsersTable;