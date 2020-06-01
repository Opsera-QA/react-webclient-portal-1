import React, { useState, useEffect, useContext, useMemo } from "react";
import { Table, Pagination } from "react-bootstrap";
import { useTable, usePagination, useSortBy } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";

function ToolsTable({ columns, data }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <Table bordered hover size="sm" {...getTableProps()}>
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
                      : <FontAwesomeIcon icon={faSort} className="float-right"/>}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, j) => {
                  return <td key={j} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* <div className="pagination">
        <Pagination className="justify-content-center">
          <Pagination.Item  onClick={() => gotoPage(0)} disabled={!canPreviousPage}>First</Pagination.Item>
          <Pagination.Item  disabled={!canPreviousPage} onClick={() => previousPage()}>Previous</Pagination.Item>
          <Pagination.Item  disabled={!canNextPage} onClick={() => nextPage()}>Next</Pagination.Item>
          <Pagination.Item  onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>Last</Pagination.Item>
        </Pagination>
         <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[25, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> 
      </div> */}
    </>
  );
}


export default ToolsTable;