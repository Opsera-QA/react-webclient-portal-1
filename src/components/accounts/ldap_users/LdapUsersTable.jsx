import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table";
import { useHistory } from "react-router-dom";
import ldapUsersFormFields from "./ldap-users-form-fields";
import { getTableDateColumn, getTableTextColumn } from "../../common/table/table-column-helpers";

function LdapUsersTable({ data }) {
  const history = useHistory();
  const [fields, setFields ] = useState({ ...ldapUsersFormFields });

  const columns = useMemo(
    () => [
      // getTableTextColumn(fields["_id"]),
      getTableTextColumn(fields["name"]),
      getTableTextColumn(fields["firstName"]),
      getTableTextColumn(fields["lastName"]),
      getTableTextColumn(fields["emailAddress"]),
      getTableTextColumn(fields["departmentName"]),
      // getTableDateColumn(fields["createdAt"]),
    ],
    []
  );

  const onRowSelect = (rowData, type) => {
    history.push("/users/" + rowData.original._id);
  };

  const rowStyling = (row) => {
    return "";
    // return !row["values"].active ? " inactive-row" : "";
  };

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false
      }
    ]
  };

  return (
    <>
      <CustomTable onRowSelect={onRowSelect} data={data} rowStyling={rowStyling} columns={columns} initialState={initialState} />
    </>
  );
}

LdapUsersTable.propTypes = {
  data: PropTypes.array,
};

export default LdapUsersTable;