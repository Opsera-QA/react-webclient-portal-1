import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

function ToolsTable({ data, rowInfo, tableFilter }) {
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
        class: "cell-center"
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

  return (
    <>
      <CustomTable 
        columns={columns} 
        data={data}
        selectedRow={rowInfo}
        rowStyling={rowStyling}
        initialState={initialState}
        tableFilter={tableFilter}
      >
      </CustomTable>
    </>
  );
}

ToolsTable.propTypes = {
  data: PropTypes.array,
  rowInfo: PropTypes.func,
  tableFilter: PropTypes.object
};

export default ToolsTable;