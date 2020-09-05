import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "../../../../common/table/table";
import {
  ldapOrganizationAccountMetaData
} from "./ldap-organization-account-form-fields";
import {getTableTextColumn} from "../../../../common/table/table-column-helpers";
import {useHistory} from "react-router-dom";
import NewLdapOrganizationModal from "../organizations/NewLdapOrganizationModal";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function LdapOrganizationAccountsTable({ldapOrganizationAccounts, loadData, }) {
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
    history.push(`/accounts/organization-accounts/${selectedRow.original.orgDomain}/details/`);
  };

  return (
    <>
      {ldapOrganizationAccounts &&
      <>
        <div className="table-content-block">
          <CustomTable
            columns={columns}
            data={ldapOrganizationAccounts}
            onRowSelect={onRowSelect}
            tableStyleName="custom-table-2"
          />
        </div>
      </>}
    </>
  );
}

LdapOrganizationAccountsTable.propTypes = {
  setShowCreateAccountModal: PropTypes.func,
  ldapOrganizationAccounts: PropTypes.array,
  loadData: PropTypes.func
};

export default LdapOrganizationAccountsTable;
