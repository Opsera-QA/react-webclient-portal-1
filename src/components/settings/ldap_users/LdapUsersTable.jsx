import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {ldapUserMetadata} from "components/settings/ldap_users/ldapUser.metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faUser} from "@fortawesome/pro-light-svg-icons";
import NewUserOverlay from "components/settings/users/NewUserOverlay";

function LdapUsersTable({ userData, orgDomain, isLoading, loadData }) {
  const fields = ldapUserMetadata.fields;
  const history = useHistory();

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
      `/settings/user-management/active/${orgDomain}/${rowData?.original?.emailAddress}/details`);
  };

  const createUser = () => {
    toastContext.showOverlayPanel(
      <NewUserOverlay
        loadData={loadData}
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