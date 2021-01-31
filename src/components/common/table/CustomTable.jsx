import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Pagination from "components/common/pagination";
import {Button, Spinner} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DtoBottomPagination from "../pagination/DtoBottomPagination";
import DtoTopPagination from "../pagination/DtoTopPagination";

export const defaultRowStyling = (row) => {
  return "";
};

export const defaultInitialState = {
  pageIndex: 0
};

function CustomTable({ tableStyleName, type, columns, data, noDataMessage, onRowSelect, rowStyling, initialState, paginationOptions, showHeaderText, isLoading, tableTitle, createNewRecord, tableFilterBar, paginationDto, setPaginationDto, loadData }) {
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
    rowClassNames += onRowSelect ? " pointer" : "";
    rowClassNames += rowStyling ? rowStyling(row) : "";  
    return rowClassNames;
  };

  const tableLoading = () => {
    return(
      <div className="row" style={{ height:"150px", width: "100%"}}>
        <div className="col-sm-12 my-auto text-center">
          <span><FontAwesomeIcon icon={faSpinner} spin className="mr-2 mt-1"/>Loading Data</span>
        </div>
      </div>
    );
  }

  const getTableTitleLoader = () => {
    if (isLoading && tableTitle && data != null && data.length !== 0) {
      return (<FontAwesomeIcon icon={faSpinner} spin className="ml-2 my-auto"/>);
    }
  };

  const getTableTitleBar = () => {
    return (
      <div>
        <Row className="d-flex justify-content-between mx-0">
          <Col sm={3} className="d-flex pl-0 my-1">
            <div><span className="h6">{tableTitle}{getTableTitleLoader()}</span></div>
          </Col>
          {tableFilterBar
            ? <Col className="pr-0"><div className="mt-0 mb-1"><div className="ml-auto">{tableFilterBar}</div></div></Col>
            :
            <div className="d-flex text-right">
              {/*TODO: Remove old add button after removing everywhere*/}
              {createNewRecord &&
                <Button size="sm" onClick={() => { createNewRecord(); }}>
                  <FontAwesomeIcon icon={faPlus}/><span className="ml-1">New {type}</span>
                </Button>
              }
            </div>
          }
        </Row>
      </div>
    );
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

  const getTableBody = () => {
    if (isLoading && (data == null || data.length === 0)) {
      return (
        <tr>
          <td colSpan="100%" className="info-text text-center p-3">{tableLoading()}</td>
        </tr>
      );
    } else {
      return (
        <>
          {rows.map((row, i) => {
            return getTableRow(row, i);
          })
          }
          {!isLoading && rows.length === 0 &&
            <tr>
              <td colSpan="100%" className="info-text text-center p-5">{noDataMessage ? noDataMessage : defaultNoDataMessage}</td>
            </tr>}
        </>
      );
    }
  };

  // TODO: Remove when all tables are updated
  const getOldPaginator = () => {
    if (!paginationOptions || isLoading) {
      return null;
    }

    return (
        <div>{paginationOptions && !isLoading && <Pagination total={paginationOptions.totalCount} currentPage={paginationOptions.currentPage} pageSize={paginationOptions.pageSize} onClick={(pageNumber, pageSize) => paginationOptions.gotoPageFn(pageNumber, pageSize)} />}</div>
    );
  };

  const getNewPaginator = () => {
    return (
        <div>{paginationDto && paginationDto.getData("totalCount") != null && <DtoBottomPagination paginationDto={paginationDto} setPaginationDto={setPaginationDto} isLoading={isLoading} loadData={loadData} />}</div>
    );
  }

  return (
    <div>
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
              <td colSpan="100%" className="px-2 py-1 table-footer">
                {getOldPaginator()}
                {getNewPaginator()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
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
  paginationOptions: PropTypes.object,
  showHeaderText: PropTypes.bool,
  isLoading: PropTypes.bool,
  tableTitle: PropTypes.string,
  createNewRecord: PropTypes.func,
  type: PropTypes.string,
  tableFilterBar: PropTypes.object,
  paginationDto: PropTypes.object,
  setPaginationDto: PropTypes.func,
  loadData: PropTypes.func
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