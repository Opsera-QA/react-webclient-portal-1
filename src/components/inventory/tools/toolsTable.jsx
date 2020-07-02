import React, { useState, useEffect, useContext, useMemo } from "react";
import { Table, Pagination } from "react-bootstrap";
import { useTable, usePagination, useSortBy } from "react-table";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";

function ToolsTable({ columns, data, rowInfo }) {

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
            id: "name",
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
              <tr className={row.values.active ? "" : "disabledTool"} key={i} {...row.getRowProps({ onClick: () => rowInfo(row) } )}>
                {row.cells.map((cell, j) => {
                  return <td key={j} {...cell.getCellProps()} className={setColumnClass(cell.column.id, columns)}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
          {rows.length == 0 && <tr><td colSpan="8" className="text-center p-5">No tools are currently registered</td></tr>}
        </tbody>
      </Table>
    </>
  );
}

ToolsTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  rowInfo: PropTypes.func
};

export default ToolsTable;