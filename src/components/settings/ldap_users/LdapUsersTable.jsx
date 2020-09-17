import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {ldapUsersMetaData} from "./ldap-users-metadata";
import { getTableTextColumn } from "../../common/table/table-column-helpers";

function LdapUsersTable({ userData, orgDomain, isLoading }) {
  const fields = ldapUsersMetaData.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "preferredName"})),
      getTableTextColumn(fields.find(field => { return field.id === "firstName"})),
      getTableTextColumn(fields.find(field => { return field.id === "lastName"})),
      getTableTextColumn(fields.find(field => { return field.id === "emailAddress"})),
      getTableTextColumn(fields.find(field => { return field.id === "title"})),
      getTableTextColumn(fields.find(field => { return field.id === "departmentName"})),
      getTableTextColumn(fields.find(field => { return field.id === "division"})),
      getTableTextColumn(fields.find(field => { return field.id === "region"})),
    ],
    [fields]
  );

  const onRowSelect = (rowData, type) => {
    history.push(`/settings/${orgDomain}/users/details/${rowData.original.emailAddress}`);
  };

  return (
    <>
      <div className="table-content-block">
        <CustomTable isLoading={isLoading} onRowSelect={onRowSelect} data={userData} columns={columns} />
      </div>
    </>
  );
}

LdapUsersTable.propTypes = {
  userData: PropTypes.array,
  orgDomain: PropTypes.string,
  isLoading: PropTypes.bool
};

export default LdapUsersTable;