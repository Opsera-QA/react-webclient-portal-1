import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {ldapUserMetadata} from "components/admin/accounts/ldap/users/ldapUser.metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faUser} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import NewOrganizationAccountUserOverlay
  from "components/admin/accounts/ldap/organization_accounts/NewOrganizationAccountUserOverlay";
import {getField} from "components/common/metadata/metadata-helpers";

function LdapUsersTable({ userData, orgDomain, isLoading, loadData }) {
  const fields = ldapUserMetadata.fields;
  const history = useHistory();
  const { toastContext } = useComponentStateReference();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"),),
      getTableTextColumn(getField(fields, "preferredName"),),
      getTableTextColumn(getField(fields, "firstName"),),
      getTableTextColumn(getField(fields, "lastName"),),
      getTableTextColumn(getField(fields, "emailAddress"),),
      getTableTextColumn(getField(fields, "title"),),
      getTableTextColumn(getField(fields, "departmentName"),),
      getTableTextColumn(getField(fields, "division"),),
      getTableTextColumn(getField(fields, "region"),),
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