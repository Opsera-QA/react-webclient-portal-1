import React, { useState, useEffect, useContext, useMemo } from "react";
import { Table } from "react-bootstrap";
import { useTable, usePagination, useSortBy } from "react-table";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";

function TagsTable({ columns, data, selectedRow }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows
  } = useTable(
    {
      columns,
      data,
      initialState: { 
        pageIndex: 0,
        sortBy: [
          {
            id: "key",
            desc: false
          }
        ] 
      },
    },
    useSortBy,
    usePagination
  );

  const setColumnClass = (id, columns) => {
    let response = "";
    if (columns && id){
      Object.keys(columns).forEach(function(key) {
        if (columns[key].accessor === id) {
          response = columns[key].class;
        }      
      });      
    } 
    return response;
  };

  return (
    <>
      <Table responsive hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i}  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, j) => (
                <th key={j} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <FontAwesomeIcon icon={faSortDown} className="float-right" />
                        : <FontAwesomeIcon icon={faSortUp} className="float-right" />
                      : null}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps({ onClick: () => selectedRow(row) } )}>
                {row.cells.map((cell, j) => {
                  return <td key={j} {...cell.getCellProps()} className={setColumnClass(cell.column.id, columns)}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
          {rows.length == 0 && <tr><td colSpan="8" className="text-center p-5">No tags are currently available</td></tr>}
        </tbody>
      </Table>
    </>
  );
}

TagsTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  selectedRow: PropTypes.func
};

export default TagsTable;