import React, { useMemo } from "react";
import { Row, Col, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { format } from "date-fns";
import "./toolDetails.css";

import "components/inventory/tools/tools.css";
import CustomTable from "components/common/table/table";

function ToolDetails(props) {
  const { toolData, closeModal } = props;
  const handleClose = () => closeModal(false);
  
  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false
      }
    ]
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Reference",
        accessor: "value",
      },
    ],
    []
  );

  const contactsColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "value",
      },
      {
        Header: "ID",
        accessor: "user_id",
      },
    ],
    []
  );

  const getTable = (data, tableColumns, object) => {
    return (
      <>
        <CustomTable 
          columns={tableColumns} 
          data={parseEmptyRows(data)}
          initialState={initialState}
          noDataMessage={"No " + object + " are assigned to this tool."}
        >
        </CustomTable>
      </>
    );
  };

  const parseEmptyRows = (data) => {
    let parsedRows = [];

    if (data && data.length > 0)
    {
      data.map((row, index) => {
        if (row["name"] || row["value"]) {
          parsedRows.push(row);
        }
      });
    }

    return parsedRows;
  }; 
  
  return (
    <>
      { Object.keys(toolData) && <>
        <div className="tool-content-block m-3 pt-2">
          <Row>
            <Col>
              <ul className="list-group my-1">
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Configuration Name:</span>
                  {toolData.name}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Tool: </span>
                  {toolData.tool_identifier}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Type:</span>
                  {toolData.tool_type_identifier}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">ID:</span>
                  {toolData._id}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Account:</span>
                  {toolData.account || ""}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Created:</span>
                  {toolData.createdAt && format(new Date(toolData.createdAt), "yyyy-MM-dd")}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Tags: </span>
                  {toolData.tags.map((tag, index) => { 
                    return(`${tag}` );
                  })}
                </li>
              </ul>
            </Col>
            <Col>
              <ul className="list-group my-1">
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Description:</span>
                  {toolData.description}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Owner:</span>
                  {toolData.owner_name}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Licensing: </span>
                  {toolData.licensing && toolData.licensing.map((item, i) => <span key={i}>{item.name}: {item.value}</span>)}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Compliance: </span>
                  {toolData.compliance && toolData.compliance.map((item, i) => <span key={i}>{item.name}: {item.value}</span>)}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Location:</span>
                  {toolData.location && toolData.location.map((item, i) => <span key={i}>{item.name}, {item.value}</span>)}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">State: </span>
                  {toolData.active ? "Active" : "Disabled"}
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul className="list-group my-2">
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Projects</span>
                  {getTable(toolData.projects, columns, "projects")}
                </li>
              </ul>
            </Col>
            <Col>
              <ul className="list-group my-2">
                <li className="list-group-item">
                  <span style={{ width: "100%" }} className="text-muted text-center">Contacts</span>
                  {getTable(toolData.contacts, contactsColumns, "contracts")}
                </li>
              </ul>
            </Col>
          </Row>

          <Row>
            <Col>
              <ul className="list-group my-2">
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Applications</span>
                  {getTable(toolData.applications, columns, "applications")}
                </li>

              </ul>
            </Col>
            <Col>
              <ul className="list-group my-2">
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Organizations</span>
                  {getTable(toolData.organization, columns, "organizations")}
                </li>
              </ul>
            </Col>    
          </Row>
        </div>
      </>}
    </>
  );
}



export default ToolDetails;
