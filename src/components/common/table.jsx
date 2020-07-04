import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

function CustomTable({ columns, data, selectedRow, rowStyling, initialState }) {
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
      initialState
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

  const getRowClassNames = (index, row) => {
    let rowClassNames = "table-row";
    rowClassNames += index % 2 == 0 ? " even" : " odd";
    rowClassNames += selectedRow ? " pointer" : "";
    rowClassNames += rowStyling ? rowStyling(row) : "";  
    return rowClassNames;
  };

  return (
    <>
      <table className="custom-table my-2 mr-1" responsive hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i}  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, j) => (
                <th className="px-2" key={j} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <FontAwesomeIcon icon={faSortDown} className="float-right mt-2" />
                        : <FontAwesomeIcon icon={faSortUp} className="float-right mt-2" />
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
              <tr className={getRowClassNames(i, row)} key={i} {...row.getRowProps({ onClick: () => selectedRow ? selectedRow(row) : null } )}>
                {row.cells.map((cell, j) => {
                  return <td key={j} {...cell.getCellProps()} className={"table-cell px-2 " + setColumnClass(cell.column.id, columns)}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
          {rows.length == 0 && <tr><td colSpan="8" className="text-center p-5">No data is currently available</td></tr>}
          {<tr><td colSpan="8" className="table-footer"></td></tr>}  
        </tbody>
      </table>
    </>
  );
}

CustomTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  selectedRow: PropTypes.func,
  rowStyling: PropTypes.func,
  initialState: PropTypes.object
};

export default CustomTable;