import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "../../../../common/table";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {ldapOrganizationAccountFormFields} from "../../ldap-organization-account-form-fields";
import {getTableTextColumn} from "../../../../common/table/table-column-helpers";

function LdapOrganizationAccountsTable({ldapOrganizationAccounts, handleAccountClick, setShowCreateAccountModal}) {
  let fields = ldapOrganizationAccountFormFields;

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false
      }
    ]
  };

  const rowStyling = (row) => {
    return "";
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields["name"]),
      getTableTextColumn(fields["org"]),
      getTableTextColumn(fields["accountName"]),
      // TODO: Create way to show administrator
      getTableTextColumn(fields["description"]),
      getTableTextColumn(fields["orgDomain"]),
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
            rowStyling={rowStyling}
            initialState={initialState}
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
