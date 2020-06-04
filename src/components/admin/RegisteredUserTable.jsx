import React, { Fragment, useMemo } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useTable, useExpanded, useSortBy } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";

function RegisteredUserTable({  data, deployingElk, handleDeletePress, handleDeployElkStack }) {

  const columns = useMemo(
    () => [
      {
        Header: "SSO Users ID",
        accessor: "_id",
      },
      {
        Header: "Name",
        accessor: "firstName"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Organization",
        accessor: "organizationName"
      },
      {
        Header: "Domain",
        accessor: "domain"
      },
      {
        Header: "Created",
        accessor: "createdAt"
      },
      {
        Header: "Actions",
        Cell: (cellData) => actionButtons(cellData)
      }
    ],
    []
  );

  const actionButtons = (cellData) => {
    return(
      <>
        <Button variant="danger" size="sm" onClick={() => { handleDeletePress(cellData._id); }} > Deactivate User</Button>
      </>
    );
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows, 
  } = useTable(
    {
      columns,
      data
    },
    useSortBy,
    useExpanded
  );

  return (
    <>
      <Table {...getTableProps()}>
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
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment key={i}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, j) => {
                    return <td key={j} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>

                {/* Sub block code goes here */}

                {Object.keys(row.original.tools).length > 0 ? (
                  <tr key={i}>
                    <td colSpan="7" style={{ borderTop: 0, paddingTop: 0, marginTop: 0, paddingBottom: "25px" }}>
                      <h6>Tools:</h6>
                      {row.original.tools.map((tool, index) => (
                        <Row key={index} style={{ marginLeft: "10px", fontSize: ".9em" }}>
                          <Col xs={3}>{tool._id}</Col>
                          <Col xs={2}>{tool.name}</Col>
                          <Col xs={2}>{tool.toolStatus}</Col>
                          <Col>{tool.dnsName}</Col>                              
                        </Row>
                      ))}
                    </td>
                  </tr>) :
                  <tr>
                    <td colSpan="7" className="text-muted text-center" style={{ borderTop: 0, paddingBottom: "25px" }}>
                          No tools are associated with this user account! 
                      <br />
                      <Button variant="outline-secondary" disabled={deployingElk} size="sm" 
                        onClick={() => { handleDeployElkStack(row._id); }} >
                            Deploy ELK Stack Now</Button> 
                    </td>
                  </tr>
                }

              </Fragment>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}


export default RegisteredUserTable;