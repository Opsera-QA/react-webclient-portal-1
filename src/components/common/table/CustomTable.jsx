import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faSpinner } from "@fortawesome/pro-light-svg-icons";
import Pagination from "components/common/pagination";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import PaginationContainer from "components/common/pagination/PaginationContainer";

export const defaultRowStyling = (row) => {
  return "";
};

export const defaultInitialState = {
  pageIndex: 0
};

function CustomTable(
  {
    className,
    tableStyleName,
    type,
    columns,
    data,
    noDataMessage,
    onRowSelect,
    rowStyling,
    initialState,
    paginationOptions,
    showHeaderText,
    isLoading,
    tableTitle,
    createNewRecord,
    tableFilterBar,
    paginationDto,
    setPaginationDto,
    loadData,
    scrollOnLoad,
    nextGeneration
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

  const setColumnClass = (id, columnDefinitions) => {
    let response = "";
    if (columnDefinitions && id){
      Object.keys(columnDefinitions).forEach(function(key) {
        if (columnDefinitions[key].accessor === id && columnDefinitions[key].class != null) {
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
  };

  const getTableTitleLoader = () => {
    if (isLoading && tableTitle && data != null && data.length !== 0) {
      return (<FontAwesomeIcon icon={faSpinner} spin className="ml-2 my-auto"/>);
    }
  };

  const getTitleBar = () => {
    return (
      <div className="d-flex pl-0 my-1 justify-content-between">
        <div className="my-auto"><span className="h6 ml-1">{tableTitle}{getTableTitleLoader()}</span></div>
        <div>
          <NewRecordButton isLoading={isLoading} type={type} addRecordFunction={createNewRecord} size={"sm"} />
        </div>
      </div>
    );
  };

  const getFilterTitleBar = () => {
    return (
      <div className="pl-0">
        <div className="mb-2"><span className="h6 ml-1">{tableTitle}{getTableTitleLoader()}</span></div>
        <div className="pr-0"><div className="mt-0"><div className="ml-auto">{tableFilterBar}</div></div></div>
      </div>
    );
  };

  const getTableTitleBar = () => {
    if (tableFilterBar) {
      return getFilterTitleBar();
    }

    return (getTitleBar());
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

    return (
      <>
        {headerGroups.map((headerGroup, i) => (
          <tr key={i}  {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, j) => (getHeaderColumn(column, j)))}
          </tr>
        ))}
      </>
    );
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
    if (isLoading && (!Array.isArray(data) || data.length === 0)) {
      return (
        <tr>
          <td colSpan="100%" className="info-text text-center p-3">{tableLoading()}</td>
        </tr>
      );
    }

    if (!isLoading && (!Array.isArray(rows) || rows.length === 0)) {
      return (
        <tr>
          <td colSpan="100%" className="info-text text-center p-5">
            {noDataMessage}
          </td>
        </tr>
      );
    }

    return (
      <>
        {
          rows.map((row, i) => {
            return getTableRow(row, i);
          })
        }
      </>
    );
  };

  // TODO: Remove when all tables are updated
  const getOldPaginator = () => {
    if (!paginationOptions || isLoading) {
      return null;
    }

    return (
      <div>
        <Pagination
          total={paginationOptions.totalCount}
          currentPage={paginationOptions.currentPage}
          pageSize={paginationOptions.pageSize}
          onClick={(pageNumber, pageSize) => paginationOptions.gotoPageFn(pageNumber, pageSize)}
        />
      </div>
    );
  };

  const getFooter = () => {
    if (paginationOptions) {
      return (
        <tfoot>
          <tr>
            <td colSpan="100%">
              <div className="table-footer">
                {getOldPaginator()}
              </div>
            </td>
          </tr>
        </tfoot>
      );
    }
  };


  return (
    <PaginationContainer nextGeneration={nextGeneration} isLoading={isLoading} filterDto={paginationDto} setFilterDto={setPaginationDto} loadData={loadData} scrollOnLoad={scrollOnLoad}>
      {tableTitle && getTableTitleBar()}
      <div className={className}>
          <table className={tableStyleName} responsive="true" hover="true" {...getTableProps()}>
            <thead>
              {getTableHeader()}
            </thead>
            <tbody {...getTableBodyProps()}>
                {getTableBody()}
            </tbody>
            {getFooter()}
          </table>
      </div>
    </PaginationContainer>
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
  loadData: PropTypes.func,
  className: PropTypes.string,
  scrollOnLoad: PropTypes.bool,
  nextGeneration: PropTypes.bool,
};

CustomTable.defaultProps = {
  tableStyleName: "custom-table",
  rowStyling: defaultRowStyling,
  initialState: defaultInitialState,
  showHeaderText: true,
  data: [],
  isLoading: false,
  tableTitle: "",
  noDataMessage: "No data is currently available",
  className: "table-content-block",
  scrollOnLoad: true
};

export default CustomTable;