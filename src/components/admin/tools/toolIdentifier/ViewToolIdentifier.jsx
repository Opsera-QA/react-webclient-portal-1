import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import "components/inventory/tools/tools.css";

function ViewToolIdentifier(props) {
  const { toolData } = props;

  return (
    <>
      { Object.keys(toolData).length > 0 && <>

        <Row>
          <Col lg={4} md={6} className="my-2 ml-2">
            <span className="pr-1 text-muted">Tool Name: </span>{toolData.name}</Col>

          <Col lg={12} md={12} className="my-2 ml-2">
            <span className="pr-1 text-muted">Description: </span>{toolData.description}</Col>
        </Row>

        <Row className="mt-3 mx-1 px-1 py-2 tool-content-block">   
          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">ID: </span>{toolData._id}</Col>

          {toolData.createdAt && <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Created: </span>{format(new Date(toolData.createdAt), "yyyy-MM-dd")}</Col>}

          <Col lg={4} md={6} className="my-2"> 
            <span className="pr-1 text-muted">Tool: </span>{toolData.identifier}</Col> 

          <Col lg={4} md={6} className="my-2"> 
            <span className="pr-1 text-muted">Type: </span>{toolData.tool_type_identifier}</Col>  
    
          {(toolData.tags && toolData.tags.length > 0) && <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Tags: </span>{toolData.tags.map(str => { return(`${str}, `);})}</Col> }

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">State: </span>{toolData.active ? "Active" : "Disabled"}</Col> 

          {toolData.properties && Object.keys(toolData.properties).length > 0 && <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Properties: </span>
            {Object.keys(toolData.properties).map((item, i) => <div className="p-1" key={i}>{item} : {toolData.properties[item] ? "Active" : "Disabled"}</div>)}</Col>}
        </Row>

      </>}
    </>
  );
}

ViewToolIdentifier.propTypes = {
  toolId: PropTypes.string,
  toolData: PropTypes.object
};


export default ViewToolIdentifier;
