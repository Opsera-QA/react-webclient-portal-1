/* This is an example of a react component using the /commong/table.jsx
    This uses hard coded objects to just show how to format data to use each feature

    This file is accessable in UI through this demo route:  /demo/table
*/

import React, { useState, useMemo } from "react";
import CustomTable from "../table";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";


function TableImplementationDemo() {
  //TODO: Define as CONST the objects that need to be passed into the table in order for it to work
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
    return !row["values"].active ? " inactive-row" : "";
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
        Header: "Tool",
        accessor: "tool_identifier"
      },      
      {
        Header: "Created",
        accessor: "createdAt",
        Cell: (props) => {
          return format(new Date(props.value), "yyyy-MM-dd");
        },
        class: "cell-center no-wrap-inline"
      },
      {
        Header: "State",
        accessor: "active",
        Cell: (props) => {
          return props.value ?  <FontAwesomeIcon icon={faCheckCircle} className="cell-icon green" /> : <FontAwesomeIcon icon={faTimesCircle} className="cell-icon red" />;
        },
        class: "cell-center"
      },
    ],
    []
  );

  const sampleDataObject = [{
    "name": "org-test",
    "description": "Opsera",
    "envCount": "5",
    "numberOfLicenses": "2000",
    "objectCount": "50000",
    "orgName": "OpsEra Test",
    "orgOwner": "Todd Barczak",
    "orgOwnerEmail": "todd@opsera.io" 
  }, {
    "name": "org-test",
    "description": "Opsera",
    "envCount": "5",
    "numberOfLicenses": "2000",
    "objectCount": "50000",
    "orgName": "OpsEra Test",
    "orgOwner": "Todd Barczak",
    "orgOwnerEmail": "todd@opsera.io" 
  }, {
    "name": "org-test",
    "description": "Opsera",
    "envCount": "5",
    "numberOfLicenses": "2000",
    "objectCount": "50000",
    "orgName": "OpsEra Test",
    "orgOwner": "Todd Barczak",
    "orgOwnerEmail": "todd@opsera.io" 
  }];

  const rowInfo = {};//????

  const tableFilter = {};//????

  return (
    
    <>
      <div>Demo of Table Component</div>

      <CustomTable 
        columns={columns} 
        data={sampleDataObject}
        selectedRow={rowInfo}
        rowStyling={rowStyling}
        initialState={initialState}
        tableFilter={tableFilter}
      >
      </CustomTable>

    </>);
}

export default TableImplementationDemo; 