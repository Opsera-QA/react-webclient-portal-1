import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { format } from "date-fns";
import ReactJson from "react-json-view";

import "components/inventory/tools/tools.css";

function ViewTags(props) {
  const { templateId, templateData } = props;

  return (
    <>
      { Object.keys(templateData).length > 0  && <>
        <Row>
          <Col lg={4} md={6} className="my-2 ml-2">
            <span className="pr-1 text-muted">Name: </span>{templateData.name}</Col>

          <Col lg={6} md={6} className="my-2">
            <span className="pr-1 text-muted">Description: </span>{templateData.description}</Col>
        </Row>

        <Row className="mt-3 mx-1 px-1 py-2 tool-content-block">   
          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">ID: </span>{templateData._id}</Col>

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Tags: </span>{templateData.tags.toString().split(",").join(", ")}</Col> 

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Type: </span>{templateData.type.toString().split(",").join(", ")}</Col> 

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Roles: </span>{templateData.roles.toString().split(",").join(", ")}</Col> 

          <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">State: </span>{templateData.active ? "Active" : "Disabled"}</Col>

          {templateData.createdAt && <Col lg={4} md={6} className="my-2">
            <span className="pr-1 text-muted">Created: </span>{format(new Date(templateData.createdAt), "yyyy-MM-dd")}</Col>}    
        </Row>
        <br />
        <p><span className="pr-1 text-muted">Plan:</span></p>
        <Row>
          <Col className="my-2 ml-2">
            <ReactJson src={templateData.plan} enableClipboard={false} displayDataTypes={false} /> 
          </Col>
        </Row>
      </>}
    </>
  );
}

ViewTags.propTypes = {
  templateId: PropTypes.string,
  templateData: PropTypes.object
};


export default ViewTags;
