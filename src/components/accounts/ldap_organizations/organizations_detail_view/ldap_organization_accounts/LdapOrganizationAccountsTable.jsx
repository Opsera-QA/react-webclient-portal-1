import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "../../../../common/table/table";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {
  ldapOrganizationAccountMetaData
} from "../../ldap-organization-account-form-fields";
import {getTableTextColumn} from "../../../../common/table/table-column-helpers";

function LdapOrganizationAccountsTable({ldapOrganizationAccounts, handleAccountClick, setShowCreateAccountModal}) {
  let fields = ldapOrganizationAccountMetaData.fields;

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
    handleAccountClick(selectedRow.original);
  };

  return (
    <>
      {ldapOrganizationAccounts &&
      <>
        <div className="my-1 text-right">
          <Button variant="primary" size="sm"
                  onClick={() => {
                    setShowCreateAccountModal(true);
                  }}>
            <FontAwesomeIcon icon={faPlus} className="mr-1"/>New Organization Account
          </Button>
        </div>
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
  handleAccountClick: PropTypes.func
};

export default LdapOrganizationAccountsTable;
