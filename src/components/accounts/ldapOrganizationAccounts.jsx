
import React, { useMemo, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import CustomTable from "../common/table";

const LdapOrganizationAccounts = (props) => {

  return (
    <div className="mt-4">
      <h6>Organization Accounts</h6>
      {props.accounts && <ContentTable data={props.accounts} view="organizations" onClick={props.onClick} />}
    </div>
  );
  
};

LdapOrganizationAccounts.propTypes = {
  accounts: PropTypes.array,
  onClick: PropTypes.func
};

function ContentTable({ data, view, onClick }) {
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
    // return !row["values"].active ? " inactive-row" : "";
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
    //first output the entire selected row value to see what you have
    console.log(selectedRow);
    let itemId = selectedRow && selectedRow.values && selectedRow.values.name; //I'm not sure what a "ID" is for an entry in LDAP, so I'm choosing NAME for now, but please review that and set this to the unique ID value for the selected entry.
    
    console.log(selectedRow.values);
    onClick(itemId);
  };


  return (
    <>
      <CustomTable 
        columns={columns} 
        data={data}
        onRowSelect={onRowSelect}
        rowStyling={rowStyling}
        initialState={initialState}
        // tableFilter={tableFilter}
      >
      </CustomTable>
    </>
  );
}

ContentTable.propTypes = {
  view: PropTypes.string,
  data: PropTypes.array,
  onClick: PropTypes.func 
};

export default LdapOrganizationAccounts;
