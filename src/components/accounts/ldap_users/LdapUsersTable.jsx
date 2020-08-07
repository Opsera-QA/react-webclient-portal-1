import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/table";
import { useHistory } from "react-router-dom";
import ldapUsersFormFields from "./ldap-users-form-fields";
import { getTableTextColumn } from "../../common/table/table-column-helpers";

function LdapUsersTable({ userData, orgDomain }) {
  const history = useHistory();
  const [fields, setFields ] = useState({ ...ldapUsersFormFields });

  const columns = useMemo(
    () => [
      getTableTextColumn(fields["name"]),
      getTableTextColumn(fields["preferredName"]),
      getTableTextColumn(fields["firstName"]),
      getTableTextColumn(fields["lastName"]),
      getTableTextColumn(fields["emailAddress"]),
      getTableTextColumn(fields["title"]),
      getTableTextColumn(fields["departmentName"]),
      getTableTextColumn(fields["division"]),
      getTableTextColumn(fields["region"]),
    ],
    []
  );

  const onRowSelect = (rowData, type) => {
    history.push(`/accounts/${orgDomain}/users/details/${rowData.original.emailAddress}`);
  };

  return (
    <>
      <div className="table-content-block">
        <CustomTable tableStyleName="custom-table-2" onRowSelect={onRowSelect} data={userData} columns={columns} />
      </div>
    </>
  );
}

LdapUsersTable.propTypes = {
  userData: PropTypes.array,
  orgDomain: PropTypes.string
};

export default LdapUsersTable;