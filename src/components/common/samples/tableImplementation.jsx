/* This is an example of a react component using the /common/CustomTable.jsx
    This uses hard coded objects to just show how to format data to use each feature

    This file is accessible in UI through this demo route:  /demo/table
*/

import React, { useState, useMemo } from "react";
import CustomTable from "../table/CustomTable";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import CustomModalDialog from "../modal/modal";
import { DropdownList } from "react-widgets";
import PropTypes from "prop-types";
import SFDCBuildTypeSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/SFDCBuildTypeSelectInput";

/*
  This table implementation is an example of creating a table component for a screen.
    Everything is isolated to keep the main screen code lean.
 */
function TableImplementationDemo() {
  const [filterOption, setFilterOption] = useState();
  const [showModal, setShowModal] = useState(false);
  //TODO: Define as CONST the objects that need to be passed into the table in order for it to work
  // These are used for different features such as sorting. It is not required.
  // I'm not sure all of the options, but sortBy is used on most pages.
  // Note: you can sort by more than one column
  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false
      }
    ]
  };

  // TODO: If you want special styling for rows, you specify it here
  // If not, don't pass in the function (or just return an empty string.
  // This example shows that it will give a class of "inactive-row" if the row doesn't have an 'active' field value of true
  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  // The columns are what data you want represented on the table. You don't need to include all fields in an object.
  // TODO: create "Field" object and use for both forms and column definitions
  const columnDefinitions = useMemo(
    () => [
      {
        // Header is the text used on the table column header
        Header: "Name",
        // Accessor is the field name inside the data object
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Environment Count",
        accessor: "envCount",
      },
      {
        Header: "Object Count",
        accessor: "objectCount",
      },
      {
        Header: "State",
        accessor: "active",
        // Note: You can format the cells however you want
        Cell: function getValue(row) {
          return row.value ?  <FontAwesomeIcon icon={faCheckCircle} className="cell-icon green" /> : <FontAwesomeIcon icon={faTimesCircle} className="cell-icon red" />;
        },
        // Note you can specify cell-specific classes
        class: "pl-3"
      },
    ],
    []
  );

  // Normally this is pulled from the server, but for this example we have hard coded data.
  const sampleDataObject = [{
    "name": "org-test",
    "description": "Opsera",
    "envCount": "4",
    "numberOfLicenses": "2000",
    "objectCount": 1000,
    "orgName": "OpsEra Test",
    "orgOwner": "Todd Barczak",
    "orgOwnerEmail": "todd@opsera.io",
    "active": "true"
  },
  {
    "name": "org-test2",
    "description": "Opsera2",
    "envCount": "5",
    "numberOfLicenses": "2000",
    "objectCount": 3000,
    "orgName": "OpsEra Test",
    "orgOwner": "Todd Barczak",
    "orgOwnerEmail": "todd@opsera.io",
  },
  {
    "name": "org-test3",
    "description": "Opsera3",
    "envCount": "3",
    "numberOfLicenses": "2000",
    "objectCount": 60000,
    "orgName": "OpsEra Test",
    "orgOwner": "Todd Barczak",
    "orgOwnerEmail": "todd@opsera.io",
    "active": "true"
  },
  {
    "name": "org-test4",
    "description": "Opsera4",
    "envCount": "1",
    "numberOfLicenses": "2000",
    "objectCount": 60000,
    "orgName": "OpsEra Test",
    "orgOwner": "Todd Barczak",
    "orgOwnerEmail": "todd@opsera.io",
    "active": "true"
  },
  {
    "name": "org-test5",
    "description": "Opsera5",
    "envCount": "2",
    "numberOfLicenses": "2000",
    "objectCount": 50000,
    "orgName": "OpsEra Test",
    "orgOwner": "Todd Barczak",
    "orgOwnerEmail": "todd@opsera.io",
    "active": "true"
  },
  {
    "name": "org-test6",
    "description": "Opsera6",
    "envCount": "6",
    "numberOfLicenses": "2000",
    "objectCount": 50000,
    "orgName": "OpsEra Test",
    "orgOwner": "Todd Barczak",
    "orgOwnerEmail": "todd@opsera.io",
    "active": "true"
  },
  {
    "name": "org-test7",
    "description": "Opsera7",
    "envCount": "7",
    "numberOfLicenses": "2000",
    "objectCount": 50000,
    "orgName": "OpsEra Test",
    "orgOwner": "Todd Barczak",
    "orgOwnerEmail": "todd@opsera.io",
    "active": "true"
  },
  {
    "name": "org-test8",
    "description": "Opsera8",
    "envCount": "8",
    "numberOfLicenses": "2000",
    "objectCount": 50000,
    "orgName": "OpsEra Test",
    "orgOwner": "Todd Barczak",
    "orgOwnerEmail": "todd@opsera.io",
    "active": "true"
  },
  ];

  // This is a function if you need to have an event happen when selecting a row (EG: opening a modal)
  const onRowSelect = () => {
    setShowModal(true);
  };

  // This is usually kept on main screen and passed in
  const updateFilterOption = (filterOption) => {
    setFilterOption(filterOption);
  };

  // These can be made manually or with createOptionFilterList in tableHelpers (if you do an API call for data that can be parsed)
  // So far, the filter only allows checking for specific data in a column cell,
  // more "interesting" sorting options should be done to the data before passing it in to the table and done on the main screen (or node query) level
  // Or we can change this to accept a function passed in instead.
  // TODO: Think on this.
  const filterOptionList = [
    {
      field: "objectCount",
      matchPartial: false,
      text: "No Filter",
      filterText: undefined
    },
    { field: "objectCount",
      matchPartial: false,
      text: "1000 objects",
      filterText: 1000
    },
    { field: "objectCount",
      matchPartial: false,
      text: "3000 objects",
      filterText: 3000
    },
    { field: "objectCount",
      matchPartial: false,
      text: "50000 objects",
      filterText: 50000
    },
    { field: "objectCount",
      matchPartial: false,
      text: "60000 objects",
      filterText: 60000
    }
  ];

  return (
    
    <>
      {showModal && <CustomModalDialog show={showModal} showheader="You clicked a row" message="this is a modal message" size="lg" handleCancelModal={() => {setShowModal(false);}} />}

      <div className="tool-filter mr-2 mt-1">
        { filterOptionList && <DropdownList
          busy={Object.keys(filterOptionList).length == 1 ? true : false}
          disabled={Object.keys(filterOptionList).length == 1 ? true : false}
          data={filterOptionList}
          valueField='filterText'
          textField='text'
          placeholder="Filter Example"
          defaultValue={filterOption}
          onChange={updateFilterOption}
        />}
      </div>

      <div>Demo of Table Component</div>
      <CustomTable
        columns={columnDefinitions}
        data={sampleDataObject}
        onRowSelect={onRowSelect}
        rowStyling={rowStyling}
        initialState={initialState}
      >
      </CustomTable>
    </>);
}

TableImplementationDemo.propTypes = {
  value: PropTypes.any
};

export default TableImplementationDemo; 