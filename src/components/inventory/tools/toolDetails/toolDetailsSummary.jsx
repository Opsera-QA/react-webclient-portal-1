import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { useParams } from "react-router-dom";

import "components/inventory/tools/tools.css";

function ToolDetails(props) {
  const handleClose = () => props.closeModal(false);
  const toolId = props.toolId;
  const toolData = props.toolData;

  return (
    <>
      <Row>
        <Col>
          <Row className="mt-2">
            <Col className="text-muted">Name:</Col>
            <Col>{toolData.name}</Col>
          </Row>
          <Row className="mt-2">
            <Col className="text-muted">Description:</Col>
            <Col>{toolData.description}</Col>
          </Row>
          <Row className="mt-2">
            <Col className="text-muted">Tool:</Col>
            <Col>{toolData.tool_identifier}</Col>
          </Row>
          <Row className="mt-2">
            <Col className="text-muted">Project:</Col>
            <Col>{toolData.project}</Col>
          </Row>
          <Row className="mt-2">
            <Col className="text-muted">Roles:</Col>
            <Col>{toolData.roles}</Col>
          </Row>
          <Row className="mt-2">
            <Col className="text-muted">Created:</Col>
            <Col>{toolData.createdAt}</Col>
          </Row>
        </Col>
        <Col>
          <Row className="mt-2">
            <Col className="text-muted">ID:</Col>
            <Col>{toolData._id}</Col>
          </Row>
          <Row className="mt-2">
            <Col className="text-muted">Contacts:</Col>
            <Col>{toolData.contacts}</Col>
          </Row>
          <Row className="mt-2">
            <Col className="text-muted">Application:</Col>
            <Col>{toolData.application}</Col>
          </Row>
          <Row className="mt-2">
            <Col className="text-muted">Tags:</Col>
            <Col>{toolData.tags}</Col>
          </Row>
          <Row className="mt-2">
            <Col className="text-muted">Active:</Col>
            <Col>{toolData.active == true ? "Yes" : "No"}</Col>
          </Row>
        </Col>
      </Row>
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
