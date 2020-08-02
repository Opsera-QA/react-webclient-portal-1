import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "../../../../common/table";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function LdapOrganizationAccountsTable({ldapOrganizationAccounts, handleAccountClick, setShowCreateAccountModal}) {
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
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Organization Domain",
        accessor: "orgDomain"
      }
    ],
    []
  );


  const onRowSelect = (selectedRow) => {
    handleAccountClick(selectedRow.values);
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
