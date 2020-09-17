import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "../../../../common/table/CustomTable";
import {
  ldapOrganizationAccountMetaData
} from "./ldap-organization-account-form-fields";
import {getTableTextColumn} from "../../../../common/table/table-column-helpers";
import {useHistory} from "react-router-dom";

function LdapOrganizationAccountsTable({ldapOrganizationAccounts, isLoading }) {
  let fields = ldapOrganizationAccountMetaData.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "orgOwner"})),
      getTableTextColumn(fields.find(field => { return field.id === "orgOwnerEmail"})),
      getTableTextColumn(fields.find(field => { return field.id === "accountName"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableTextColumn(fields.find(field => { return field.id === "orgDomain"})),
    ],
    []
  );

  const onRowSelect = (selectedRow) => {
    history.push(`/admin/organization-accounts/${selectedRow.original.orgDomain}/details/`);
  };

  return (
    <>
        <div className="table-content-block">
          <CustomTable
            columns={columns}
            isLoading={isLoading}
            data={ldapOrganizationAccounts}
            onRowSelect={onRowSelect}
          />
        </div>
    </>
  );
}

LdapOrganizationAccountsTable.propTypes = {
  ldapOrganizationAccounts: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default LdapOrganizationAccountsTable;
