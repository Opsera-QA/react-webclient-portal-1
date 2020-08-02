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
      getTableTextColumn(fields["preferredName"]),
      getTableTextColumn(fields["firstName"]),
      getTableTextColumn(fields["lastName"]),
      getTableTextColumn(fields["emailAddress"]),
      getTableTextColumn(fields["title"]),
      getTableTextColumn(fields["departmentName"]),
      getTableTextColumn(fields["division"]),
      // getTableDateColumn(fields["createdAt"]),
    ],
    []
  );

  const onRowSelect = (rowData, type) => {
    // TODO: Update to ID or some sort of unique field if added
    history.push("/accounts/users/" + rowData.original.emailAddress);
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
      <div className="table-content-block">
        <CustomTable tableStyleName="custom-table-2" onRowSelect={onRowSelect} data={data} rowStyling={rowStyling} columns={columns} initialState={initialState} />
      </div>
    </>
  );
}

LdapUsersTable.propTypes = {
  data: PropTypes.array,
};

export default LdapUsersTable;