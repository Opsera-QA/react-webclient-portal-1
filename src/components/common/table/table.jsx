import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import Pagination from "components/common/pagination";

export const defaultRowStyling = (row) => {
  return "";
};

export const defaultInitialState = {
  pageIndex: 0,
  sortBy: [
    {
      id: "name",
      desc: false
    }
  ]
};

function CustomTable({ tableStyleName, columns, data, noDataMessage, onRowSelect, rowStyling, initialState, tableFilter, paginationOptions }) {
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

  const defaultNoDataMessage = "No data is currently available";

  const setColumnClass = (id, columnDefinitions) => {
    let response = "";
    if (columnDefinitions && id){
      Object.keys(columnDefinitions).forEach(function(key) {
        if (columnDefinitions[key].accessor === id) {
          response = columnDefinitions[key].class;
        }      
      });      
    } 
    return response;
  };

  const getRowClassNames = (index, row) => {
    let rowClassNames = "table-row";
    rowClassNames += index % 2 == 0 ? " even" : " odd";
    rowClassNames += onRowSelect ? " pointer" : "";
    rowClassNames += rowStyling ? rowStyling(row) : "";  
    return rowClassNames;
  };

  const filterRow = (row) => {
    if (tableFilter && tableFilter.filterText) {
      
      if (tableFilter.matchPartial){
        return row.values[tableFilter.field].includes(tableFilter.filterText);
      }
      
      return row.values[tableFilter.field] !== tableFilter.filterText;
    }
    return false;
  };

  return (
    <>
      {/* TODO: Create Title bar and action bar components */}
      {/* <div className="table-title-bar mt-3 mr-1">
        <div className="table-title ml-2">Table header</div>
      </div> */}
      <table className={tableStyleName} responsive="true" hover="true" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i}  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, j) => (
                <th className="px-2" key={j} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div style={{ display: "flex",  flexWrap: "nowrap" }}>
                    <div>{column.render("Header")}</div>
                    <div className="ml-1">
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <FontAwesomeIcon icon={faSortDown} />
                          : <FontAwesomeIcon icon={faSortUp} />
                        : null}
                    </div>
                  </div>                  
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return filterRow(row) ? null : (
              <tr className={getRowClassNames(i, row)} key={i} {...row.getRowProps({ onClick: () => onRowSelect ? onRowSelect(row) : null } )}>
                {row.cells.map((cell, j) => {
                  return <td key={j} {...cell.getCellProps()} className={"table-cell px-2 " + setColumnClass(cell.column.id, columns)}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
          {rows.length == 0 && <tr><td colSpan="8" className="info-text text-center p-5">{noDataMessage ? noDataMessage : defaultNoDataMessage}</td></tr>}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="100%" className="px-2 pt-2 table-footer">
              {paginationOptions && <Pagination total={paginationOptions.totalCount} currentPage={paginationOptions.currentPage} pageSize={paginationOptions.pageSize} onClick={(pageNumber, pageSize) => paginationOptions.gotoPageFn(pageNumber, pageSize)} />}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

CustomTable.propTypes = {
  tableStyleName: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  noDataMessage: PropTypes.string,
  onRowSelect: PropTypes.func,
  rowStyling: PropTypes.func,
  initialState: PropTypes.object,
  tableFilter: PropTypes.object,
  paginationOptions: PropTypes.object
};

CustomTable.defaultProps = {
  tableStyleName: "custom-table",
  rowStyling: defaultRowStyling,
  initialState: defaultInitialState,
  data: []
};

export default CustomTable;