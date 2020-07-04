import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { format } from "date-fns";
import "./toolDetails.css";

import "components/inventory/tools/tools.css";

function ToolDetails(props) {
  const { toolData, closeModal } = props;
  const handleClose = () => closeModal(false);
  
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
                  <Table striped bordered hover className="table-sm" style={{ fontSize:"small" }}>
                    <thead>
                      <tr>
                        <th className="text-center" style={{ width: "50%" }}>Name</th>
                        <th className="text-center" style={{ width: "50%" }}>Reference</th>                
                      </tr>
                    </thead>
                    <tbody>
                      {toolData.projects && toolData.projects.map((item, i) => (
                        <tr key={i} >
                          <td className="text-center">{item["name"]}</td>
                          <td className="text-center">{item["value"]}</td>
                        </tr>
                      ))}
                      {(!toolData.projects || toolData.projects.length == 0) && <tr><td colSpan="8" className="text-center p-5">No projects are assigned to this tool.</td></tr>}
                    </tbody>
                  </Table>
                </li>
              </ul>
            </Col>
            <Col>
              <ul className="list-group my-2">
                <li className="list-group-item">
                  <span style={{ width: "100%" }} className="text-muted text-center">Contacts</span>
                  <Table striped bordered hover className="table-sm" style={{ fontSize:"small" }}>
                    <thead>
                      <tr>
                        <th className="text-center" style={{ width: "50%" }}>Name</th>
                        <th className="text-center" style={{ width: "50%" }}>Email</th>
                        <th className="text-center" style={{ width: "50%" }}>ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {toolData.contacts && toolData.contacts.map((item, i) => 
                        <tr key={i} >
                          <td className="text-center">{item["name"]}</td>
                          <td className="text-center">{item["email"]}</td>
                          <td className="text-center text-muted">{item["user_id"]}</td>
                        </tr>
                      )}
                      {(!toolData.contacts || toolData.contacts.length == 0) && <tr><td colSpan="8" className="text-center p-5">No contacts are assigned to this tool.</td></tr>}
                    </tbody>
                  </Table>
                </li>
              </ul>
            </Col>
          </Row>

          <Row>
            <Col>
              <ul className="list-group my-2">
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Applications</span>
                  <Table striped bordered hover className="table-sm" style={{ fontSize:"small" }}>
                    <thead>
                      <tr>
                        <th className="text-center" style={{ width: "50%" }}>Name</th>
                        <th className="text-center" style={{ width: "50%" }}>Reference</th>                
                      </tr>
                    </thead>
                    <tbody>
                      {toolData.applications && toolData.applications.map((item, i) => (
                        <tr key={i} >
                          <td className="text-center">{item["name"]}</td>
                          <td className="text-center">{item["value"]}</td>
                        </tr>
                      ))}
                      {(!toolData.applications || toolData.applications.length == 0) && <tr><td colSpan="8" className="text-center p-5">No applications are assigned to this tool.</td></tr>}
                    </tbody>
                  </Table>
                </li>

              </ul>
            </Col>
            <Col>
              <ul className="list-group my-2">
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Organizations</span>
                  <Table striped bordered hover className="table-sm" style={{ fontSize:"small" }}>
                    <thead>
                      <tr>
                        <th className="text-center" style={{ width: "50%" }}>Name</th>
                        <th className="text-center" style={{ width: "50%" }}>Reference</th>                
                      </tr>
                    </thead>
                    <tbody>
                      {toolData.organization && toolData.organization.length > 0 && toolData.organization.map((item, i) => (
                        <tr key={i} >
                          <td className="text-center">{item["name"]}</td>
                          <td className="text-center">{item["value"]}</td>
                        </tr>
                      ))}
                      {(!toolData.organization || toolData.organization.length == 0) && <tr><td colSpan="8" className="text-center p-5">No organizations are assigned to this tool.</td></tr>}
                    </tbody>
                  </Table>
                </li>

              </ul>
            </Col>    
          </Row>
        </div>
      </>}
    </>
  );
}

ToolDetails.propTypes = {
  closeModal: PropTypes.func,
  toolData: PropTypes.object
};


export default ToolDetails;
