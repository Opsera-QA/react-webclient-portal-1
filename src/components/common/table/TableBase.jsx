import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faSpinner } from "@fortawesome/pro-light-svg-icons";
import DtoBottomPagination from "../pagination/DtoBottomPagination";
import DtoTopPagination from "../pagination/DtoTopPagination";

export const defaultInitialState = {
  pageIndex: 0,
};

export const defaultRowStyling = (row) => {
  return "";
};

function TableBase(
  {
    tableStyleName,
    columns,
    data,
    noDataMessage,
    onRowSelect,
    rowStyling,
    initialState,
    showHeaderText,
    isLoading,
    tableTitle,
    tableFilterBar,
    paginationDto,
    setPaginationDto,
    loadData
  }) {


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

  // TODO: Redo the way this works
  const getRowClassNames = (index, row) => {
    let rowClassNames = "table-row";

    if (onRowSelect) {
      rowClassNames += " pointer";
    }

    if (rowStyling) {
      rowClassNames += rowStyling(row);
    }

    return rowClassNames;
  };

  const getTableHeader = () => {
    if ((isLoading && data == null) || !showHeaderText || !headerGroups) {
      return (
        <tr>
          <th colSpan="12">
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
              {headerGroup.headers.map((column, j) => (getHeaderColumn(column, j)))}
            </tr>
          ))}
          {paginationDto && paginationDto.getData("totalCount") != null &&
          <tr key={"topPaginator"}>
            <td className="top-pagination pt-1 px-3" colSpan="12">
              <DtoTopPagination paginationDto={paginationDto}
                                setPaginationDto={setPaginationDto}
                                isLoading={isLoading}
                                loadData={loadData}/>
            </td>
          </tr>
          }
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

  const getTableRow = (row, index) => {
    prepareRow(row);
    return (
      <tr className={getRowClassNames(index, row)} key={index} {...row.getRowProps({onClick: () => onRowSelect ? onRowSelect(row) : null})}>
        {row.cells.map((cell, j) => {
          return (
            <td key={j} {...cell.getCellProps()} className={"table-cell px-2 " + setColumnClass(cell.column.id, columns)}>
              {cell.render("Cell")}
            </td>
          );
        })}
      </tr>);
  };

  const getTableRows = () => {
    if (!isLoading && rows.length === 0) {
      return (
        <tr>
          <td colSpan="100%" className="info-text text-center p-5">{noDataMessage ? noDataMessage : defaultNoDataMessage}</td>
        </tr>
      );
    }

    return (rows.map((row, i) => {return getTableRow(row, i);}));
  };

  const getTableBody = () => {
    if (isLoading && (data == null || data.length === 0)) {
      return (
        <tr>
          <td colSpan="100%" className="info-text text-center p-3">{tableLoading()}</td>
        </tr>
      );
    } else {
      return (
        <div className="table-base-body">
          {getTableRows()}
        </div>
      );
    }
  };

  return (
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
          <td colSpan="100%" className="px-2 py-1 table-footer">
            <DtoBottomPagination paginationDto={paginationDto} setPaginationDto={setPaginationDto} isLoading={isLoading} loadData={loadData} />
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
  );
}

TableBase.propTypes = {
  tableStyleName: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  noDataMessage: PropTypes.string,
  onRowSelect: PropTypes.func,
  rowStyling: PropTypes.func,
  initialState: PropTypes.object,
  showHeaderText: PropTypes.bool,
  isLoading: PropTypes.bool,
  tableTitle: PropTypes.string,
  tableFilterBar: PropTypes.object,
  paginationDto: PropTypes.object,
  setPaginationDto: PropTypes.func,
  loadData: PropTypes.func
};

TableBase.defaultProps = {
  tableStyleName: "custom-table",
  rowStyling: defaultRowStyling,
  initialState: defaultInitialState,
  showHeaderText: true,
  data: [],
  isLoading: false,
  tableTitle: ""
};

export default TableBase;