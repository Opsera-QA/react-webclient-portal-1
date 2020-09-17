import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSortUp, faSortDown, faPlus} from "@fortawesome/free-solid-svg-icons";
import Pagination from "components/common/pagination";
import {Button, Spinner} from "react-bootstrap";

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

function CustomTable({ tableStyleName, type, columns, data, noDataMessage, onRowSelect, rowStyling, initialState, tableFilter, paginationOptions, showHeaderText, isLoading, tableTitle, createNewRecord }) {
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

  const tableLoading = () => {
    return(
      <div className="row" style={{ height:"150px", width: "100%"}}>
        <div className="col-sm-12 my-auto text-center">
          <Spinner className="mr-2" as="span"
                   animation="border"
                   variant="primary"
                   size="sm"
                   role="status"
                   aria-hidden="true" />
          Loading Data
        </div>
      </div>
    );
  }

  const getTableTitleLoader = () => {
    return (
      <>
        {isLoading && tableTitle && data != null && data.length !== 0 &&
          <span className="ml-2">
                    <Spinner className="mr-2" as="span" animation="border" variant="dark" size="sm" role="status"
                             aria-hidden="true"/>
                    Loading Data
          </span>
        }
      </>
    );
  };

  const getTableTitleBar = () => {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <div className="mx-2 d-flex my-auto">{tableTitle}{getTableTitleLoader()}</div>
          {/*TODO: Implement Table Action Bar with ability for filters*/}
          <div className="d-flex text-right">
            {createNewRecord && <Button size="sm" className={"o"}
                                        onClick={() => {
                                          createNewRecord();
                                        }}>
              <FontAwesomeIcon icon={faPlus}/>
              <span className="ml-1">New {type}</span>
            </Button>}
          </div>
        </div>
      </div>
    );
  };

  const getTableHeader = () => {
    if ((isLoading && data == null) || !showHeaderText || !headerGroups) {
      return (
        <tr>
          <th>
            <div className="no-header-text" />
          </th>
        </tr>
      );
    }
    else {
      return (
        <>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i}  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, j) => (
                getHeaderColumn(column, j)
              ))}
            </tr>
          ))}
        </>
      );
    }
  };

  const getHeaderColumn = (column, key) => {
    return (
      <th className="px-2" key={key} {...column.getHeaderProps(column.getSortByToggleProps())}>
        <div style={{display: "flex", flexWrap: "nowrap"}}>
          <div>{column.render("Header")}</div>
          <div className="ml-1">
            {column.isSorted && <FontAwesomeIcon icon={column.isSortedDesc ? faSortDown : faSortUp}/>}
          </div>
        </div>
      </th>
    );
  };

  const getTableBody = () => {
    if (isLoading && (data == null || data.length === 0)) {
      return (
        <tr>
          <td colSpan="8" className="info-text text-center p-3">{tableLoading()}</td>
        </tr>
      );
    } else {
      return (
        <>
          {rows.map((row, i) => {
            prepareRow(row);
            return filterRow(row) ? null : (
              <tr className={getRowClassNames(i, row)}
                  key={i} {...row.getRowProps({onClick: () => onRowSelect ? onRowSelect(row) : null})}>
                {row.cells.map((cell, j) => {
                  return <td key={j} {...cell.getCellProps()}
                             className={"table-cell px-2 " + setColumnClass(cell.column.id, columns)}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })
          }
          {!isLoading && rows.length === 0 &&
            <tr>
              <td colSpan="8" className="info-text text-center p-5">{noDataMessage ? noDataMessage : defaultNoDataMessage}</td>
            </tr>}
        </>
      );
    }
  };

  return (
    <>
      {tableTitle && getTableTitleBar()}
      <div className="table-content-block">
        <table className={tableStyleName} responsive="true" hover="true" {...getTableProps()}>
          <thead>
            {getTableHeader()}
          </thead>
          <tbody {...getTableBodyProps()}>
              {getTableBody()}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="100%" className="px-2 pt-2 table-footer">
                {paginationOptions && <Pagination total={paginationOptions.totalCount} currentPage={paginationOptions.currentPage} pageSize={paginationOptions.pageSize} onClick={(pageNumber, pageSize) => paginationOptions.gotoPageFn(pageNumber, pageSize)} />}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
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
  paginationOptions: PropTypes.object,
  showHeaderText: PropTypes.bool,
  isLoading: PropTypes.bool,
  tableTitle: PropTypes.string,
  createNewRecord: PropTypes.func,
  type: PropTypes.string
};

CustomTable.defaultProps = {
  tableStyleName: "custom-table",
  rowStyling: defaultRowStyling,
  initialState: defaultInitialState,
  showHeaderText: true,
  data: [],
  isLoading: false,
  tableTitle: ""
};

export default CustomTable;