import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "../common/table";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

function LdapContentTable({ data, onRowSelect, tableFilter }) {
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
        Header: "Organization Name",
        accessor: "orgName"
      },
        {
            Header: "Organization Owner Email",
            accessor: "orgOwnerEmail"
        }
    ],
    []
  );

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

LdapContentTable.propTypes = {
  data: PropTypes.array,
  onRowSelect: PropTypes.func,
  tableFilter: PropTypes.object
};

export default LdapContentTable;