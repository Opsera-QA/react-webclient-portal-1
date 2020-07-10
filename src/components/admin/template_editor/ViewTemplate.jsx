import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { format } from "date-fns";
import ReactJson from "react-json-view";

import "components/inventory/tools/tools.css";

function ViewTags( { templateId, templateData } ) {
  return (
    <>
      { Object.keys(templateData).length > 0 && <>
        <div className="tool-content-block m-3 pt-2">
          <Row>
            <Col>
              <ul className="list-group my-1">
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Template Name: </span>
                  {templateData.name}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">ID: </span>
                  {templateData._id}
                </li>
                <li className="list-group-item">
                  <span className="pr-2 text-muted">Created:</span>
                  {templateData.createdAt && format(new Date(templateData.createdAt), "yyyy-MM-dd")}
                </li>
              </ul>
            </Col>
            <Col>
              <ul className="list-group my-1">
                <li className="list-group-item">
                  <span className="pr-1 text-muted">Description: </span>
                  {templateData.description}
                </li>
                <li className="list-group-item">
                  <span className="pr-1 text-muted">State: </span>
                  {templateData.active ? "Active" : "Disabled"}
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="pr-1 text-muted">Tags: </span>
                  {templateData.tags.toString().split(",").join(", ")}
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="pr-1 text-muted">Type: </span>
                  {templateData.type.toString().split(",").join(", ")}
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="pr-1 text-muted">Roles: </span>
                  {templateData.roles.toString().split(",").join(", ")}
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="pr-1 text-muted">Plan: </span>
                  <ReactJson src={templateData.plan} enableClipboard={false} displayDataTypes={false} />
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </>}
    </>
  );
}

ViewTags.propTypes = {
  templateId: PropTypes.string,
  templateData: PropTypes.object
};


export default ViewTags;
