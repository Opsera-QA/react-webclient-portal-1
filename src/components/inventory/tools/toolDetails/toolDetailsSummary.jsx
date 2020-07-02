import React, { useContext, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { AuthContext } from "../../../../contexts/AuthContext";
import PipelineHelpers from "../../../workflow/pipelineHelpers";
import PropTypes from "prop-types";
import { format } from "date-fns";
import "./toolDetails.css";

import "components/inventory/tools/tools.css";

function ToolDetails(props) {
  const { toolId, toolData, fnEditTool } = props;
  const handleClose = () => props.closeModal(false);
  const [ownerName, setOwnerName] = useState("");
  const contextType = useContext(AuthContext);

  const loadData = async (toolData) => {
    try {
     
      const { getAccessToken } = contextType;
      let owner = await PipelineHelpers.getUserNameById(toolData.owner, getAccessToken);
      setOwnerName(owner);
    }
    catch (err) {
      if (err.name === "AbortError") {
        console.log("Request was canceled via controller.abort");
        return;
      }      
    }
  };

  //console.log(toolId);
  //console.log(JSON.stringify(toolData));
  loadData(toolData);
  return (
    <>
      { Object.keys(toolData) && ownerName && <>
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
                  {/* <div key="checkbox-tools" className="mb-1 mt-2 p-2">
                  <Multiselect
                    data={toolData.tags} 
                    className="basic-multi-select"
                    valueField='value'
                    textField='label'
                    disabled
                    defaultValue={toolData.tags.length > 0 ? toolData.tags[0] : []}        
                  />
                </div> */}
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
                {/* TODO: pull actual owner name */}
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Owner:</span>
                  {ownerName ? ownerName : toolData.owner}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Licensing: </span>
                  {toolData.licensing.map((item, i) => <span key={i}>{item.name}: {item.value}</span>)}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Compliance: </span>
                  {toolData.compliance.map((item, i) => <span key={i}>{item.name}: {item.value}</span>)}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Location:</span>
                  {toolData.location.map((item, i) => <span key={i}>{item.name}, {item.value}</span>)}
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
                      {/* <tr>
                      <th className="text-center" colSpan="8"><span className="text-muted">Projects</span></th>
                    </tr> */}
                      <tr>
                        <th className="text-center" style={{ width: "50%" }}>Name</th>
                        <th className="text-center" style={{ width: "50%" }}>Reference</th>                
                      </tr>
                    </thead>
                    <tbody>
                      {toolData.projects.map((item, i) => (
                        <tr key={i} >
                          <td className="text-center">{item["name"]}</td>
                          <td className="text-center">{item["value"]}</td>
                        </tr>
                      ))}
                      {toolData.projects.length == 0 && <tr><td colSpan="8" className="text-center p-5">No projects are assigned to this tool.</td></tr>}
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
                      {toolData.contacts.map((item, i) => 
                        <tr key={i} >
                          <td className="text-center">{item["name"]}</td>
                          <td className="text-center">{item["email"]}</td>
                          <td className="text-center text-muted">{item["user_id"]}</td>
                        </tr>
                      )}
                      {toolData.contacts.length == 0 && <tr><td colSpan="8" className="text-center p-5">No contacts are assigned to this tool.</td></tr>}
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
                      {toolData.applications.map((item, i) => (
                        <tr key={i} >
                          <td className="text-center">{item["name"]}</td>
                          <td className="text-center">{item["value"]}</td>
                        </tr>
                      ))}
                      {toolData.applications.length == 0 && <tr><td colSpan="8" className="text-center p-5">No applications are assigned to this tool.</td></tr>}
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
                      {toolData.organization.map((item, i) => (
                        <tr key={i} >
                          <td className="text-center">{item["name"]}</td>
                          <td className="text-center">{item["value"]}</td>
                        </tr>
                      ))}
                      {toolData.organization.length == 0 && <tr><td colSpan="8" className="text-center p-5">No organizations are assigned to this tool.</td></tr>}
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
  showModal: PropTypes.bool,
  type: PropTypes.string,
  toolId: PropTypes.string,
  toolData: PropTypes.object,
  fnEditTool: PropTypes.func
};


export default ToolDetails;
