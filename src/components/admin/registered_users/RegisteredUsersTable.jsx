import React, {Fragment, useContext, useMemo, useState} from "react";
import {Table, Button, Row, Col} from "react-bootstrap";
import { useTable, useExpanded, useSortBy } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSortUp, faSortDown, faSort, faSpinner} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import "../admin.css";
import ModalActivityLogs from "../../common/modal/modalActivityLogs";
import {faSearchPlus} from "@fortawesome/pro-regular-svg-icons";
import RegisteredUserActions from "./registered-user-actions";
import {AuthContext} from "../../../contexts/AuthContext";
import registeredUsersMetadata from "./registered-users-form-fields";
import {getTableDateColumn, getTableTextColumn} from "../../common/table/table-column-helpers";
import {DialogToastContext} from "../../../contexts/DialogToastContext";

function RegisteredUsersTable({  data, deployingElk, isLoading, handleDeletePress, handleDeployElkStack, gotoProfile }) {
  const fields = registeredUsersMetadata.fields;
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "_id"})),
      {
        Header: "User Info",
        accessor: "row",
        Cell: (props) => {
          return (
            <>
              <FontAwesomeIcon icon={faSearchPlus}
                             style={{ cursor: "pointer" }}
                             onClick= {() => { selectRow(props, props.row, props.row["index"]); }} />
            </>
          );
        },
      },
      getTableTextColumn(fields.find(field => { return field.id === "firstName"})),
      getTableTextColumn(fields.find(field => { return field.id === "lastName"})),
      getTableTextColumn(fields.find(field => { return field.id === "email"})),
      getTableTextColumn(fields.find(field => { return field.id === "organizationName"})),
      getTableTextColumn(fields.find(field => { return field.id === "domain"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      {
        Header: "Actions",
        Cell: (cellData) => actionButtons(cellData)
      }
    ],
    []
  );

  const selectRow = (rows, row, index) => {
    return getUserData(rows["data"][index]["_id"]);
  };

  const getUserData = async (userId) => {
    try {
      setShowModal(true);
      const response = await RegisteredUserActions.getUserRecord(userId, getAccessToken);
      // console.log("[LdapOrganizationDetailView] Response: ", response.data);
      setModalData(response.data);
    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
      // setError(error);
    }
  }

  const actionButtons = (cellData) => {
    return(
      <>
        <Button variant="primary" size="sm" onClick={() => { gotoProfile(cellData.row.original._id); }} className="mr-2">User Settings</Button>
        <Button variant="danger" size="sm" onClick={() => { handleDeletePress(cellData.row.original._id); }}>Deactivate User</Button>
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
      <div className="table-content-block">
      <Table className="custom-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i}  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, j) => (
                <th key={j} className="px-2 py-1" {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div style={{display: "flex", flexWrap: "nowrap"}}>
                    {column.render("Header")}
                    <span className="ml-1">
                      {column.isSorted && <FontAwesomeIcon icon={column.isSortedDesc ? faSortDown : faSortUp}/>}
                    </span>
                  </div>
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

                {Object.keys(row.original.tools).length > 0 && <tr><td colSpan="7">Tools:</td></tr>}
                {Object.keys(row.original.tools).length > 0 ? (
                  <tr key={i} className="tools-block">
                    <td colSpan="12">
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
                  <tr className="tools-block">
                    <td colSpan="2" className="text-muted text-center"> No tools are associated with this user account! Go into the User Settings Tools tab to deploy ELK stack</td>
                    <td colSpan="2" className="text-muted text-center">
                      <Button variant="secondary" disabled={deployingElk} size="sm"
                        onClick={() => { handleDeployElkStack(row.original._id); }} >
                            Deploy ELK Stack Now</Button>
                    </td>
                  </tr>
                }

              </Fragment>
            );
          })}
        </tbody>
      </Table>
      </div>
      <ModalActivityLogs header="User Information" size="lg" jsonData={modalData} show={showModal} setParentVisibility={setShowModal} />
    </>
  );
}

RegisteredUsersTable.propTypes = {
  data: PropTypes.array,
  deployingElk: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleDeletePress: PropTypes.func,
  handleDeployElkStack: PropTypes.func,
  gotoProfile: PropTypes.func
};

export default RegisteredUsersTable;