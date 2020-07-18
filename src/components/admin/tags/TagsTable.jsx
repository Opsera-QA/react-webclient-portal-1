import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import CustomTable from "components/common/table";

function TagsTable({ data, selectedRow }) {
  const columns = useMemo(
    () => [
      {
        Header: "Key",
        accessor: "key",
      },
      {
        Header: "Value",
        accessor: "value",
      },      
      {
        Header: "Owner",
        accessor: "owner_name",
      },   
      {
        Header: "Account",
        accessor: "account",
      },           
      {
        Header: "Active",
        accessor: "active",
        Cell: (props) => {
          return props.value ?  <FontAwesomeIcon icon={faCheckCircle} className="green" /> :  <FontAwesomeIcon icon={faTimesCircle} className="red" />;
        },
        class: "cell-center"
      },
      {
        Header: "Created",
        accessor: "createdAt",
        Cell: (props) => {
          return props.value ? format(new Date(props.value), "yyyy-MM-dd") : "";
        },
        class: "cell-center no-wrap-inline"
      },
    ],
    []
  );

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "key",
        desc: false
      }
    ]
  };

  return (
    <>
      <CustomTable onRowSelect={selectedRow} data={data} rowStyling={rowStyling} columns={columns} initialState={initialState}></CustomTable>
    </>
  );
}

TagsTable.propTypes = {
  data: PropTypes.array,
  selectedRow: PropTypes.func
};

export default TagsTable;