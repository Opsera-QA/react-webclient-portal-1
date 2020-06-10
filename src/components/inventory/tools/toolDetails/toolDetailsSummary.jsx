import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { format } from "date-fns";

import "components/inventory/tools/tools.css";

function ToolDetails(props) {
  const { toolId, toolData } = props;
  const handleClose = () => props.closeModal(false);

  console.log(toolId);
  console.log(toolData);

  return (
    <>
      { Object.keys(toolData) && <>
        <Row className="mt-4">
          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Name: </span>{toolData.name}</Col>

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">ID: </span>{toolData._id}</Col>

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Created: </span>{format(new Date(toolData.createdAt), "yyyy-MM-dd")}</Col>

          <Col lg={12} md={12} className="my-2">
            <span className="pr-1 text-muted">Description: </span>{toolData.description}</Col>
        </Row>

        <Row className="mt-3 mx-1 px-1 tool-content-block">            
          <Col lg={4} md={6} className="my-2"> 
            <span className="pr-1 text-muted">Tool: </span>{toolData.tool_identifier}</Col> 

          <Col lg={4} md={6} className="my-2"> 
            <span className="pr-1 text-muted">Type: </span>{toolData.tool_type_identifier}</Col>

          <Col lg={4} md={6} className="my-2"> 
            <span className="pr-1 text-muted">Owner: </span>{toolData.owner}</Col>

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Organization: </span>{toolData.organization ? toolData.organization.name : null}</Col>
        
          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Location: </span>{toolData.location ? toolData.organization.location : null}</Col>

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Tags: </span>{toolData.tags.map(str => { return(`${str},`);})}</Col>
        </Row>

        <Row className="mt-3 mx-1 px-1 tool-content-block">
          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Contacts: </span>
            {toolData.contacts.map((item, i) => <div className="p-1" key={i}>{item.name} {item.email}</div>)}</Col>

          {/* <Col lg={4} md={6} className="my-2">
          <span className="pr-1 text-muted">External References: </span>coming soon</Col> */}

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Licensing: </span>
            {toolData.licensing.map((item, i) => <div className="p-1" key={i}>{item.name}: {item.value}</div>)}</Col>
          
          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Compliance: </span>
            {toolData.compliance.map((item, i) => <div className="p-1" key={i}>{item.name}: {item.value}</div>)}</Col>
          
          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Projects: </span>
            {toolData.projects.map((item, i) => <div className="p-1" key={i}>{item.name}: {item.reference}</div>)}</Col>

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Applications: </span>
            {toolData.applications.map((item, i) => <div className="p-1" key={i}>{item.name}: {item.reference}</div>)}</Col>

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">State: </span>{toolData.active ? "Active" : "Disabled"}</Col>

        </Row> 
      </>}
      
      <div className="tool-details-buttons">
        <Button variant="success" size="sm" onClick={handleClose}>Button 1</Button>
        <Button variant="primary" size="sm" onClick={handleClose}>Button 2</Button>
        <Button variant="success" size="sm" onClick={handleClose}>Button 3</Button>
        <Button variant="danger" size="sm" onClick={handleClose}>Button 4</Button>
      </div>
    </>
  );
}

ToolDetails.propTypes = {
  showModal: PropTypes.bool,
  type: PropTypes.string,
  toolId: PropTypes.string,
  toolData: PropTypes.object
};


export default ToolDetails;
