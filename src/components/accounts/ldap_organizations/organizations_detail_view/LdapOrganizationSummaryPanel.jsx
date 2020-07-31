import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Button, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap, faUserCircle, faUserFriends, faUser, faFileAlt, faPencilAlt, faTrash, faSave, faTimes, faCogs, faFlag, faCopy } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const LdapOrganizationSummaryPanel = (props) => {

  function renderTooltip(props) {
    const { message } = props;
    return (
      <Tooltip id="button-tooltip" {...props}>
        {message}
      </Tooltip>
    );
  }

  return (
    <>
      <div className="mb-3 flat-top-content-block p-3">              
        <div className="mb-2 text-muted">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: "Delete this pipeline" })} >
            <FontAwesomeIcon icon={faTrash} className="pointer red float-right ml-3" onClick={() => { }}/></OverlayTrigger>

          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: "Duplicate this pipeline configuration" })} >
            <FontAwesomeIcon icon={faCopy} className="pointer float-right ml-3" onClick={() => { }}/></OverlayTrigger>
                
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: "View Pipeline Configurations" })} >
            <FontAwesomeIcon icon={faFileAlt}
              className="float-right text-muted ml-3"                  
              style={{ cursor: "pointer" }}
              onClick= {() => {  }} /></OverlayTrigger>
        </div>
        
        <hr></hr>
        {
          (props.organization) ? (
            <>
              <Row className="mt-3">
                <Col lg className="py-1"><span className="text-muted mr-1">Name:</span> {props.organization.orgName} ({props.organization.name})</Col>
                <Col lg className="py-1"><span className="text-muted mr-1">Description:</span> {props.organization.description}</Col>
              </Row>
              <Row className="mt-3">
                <Col lg className="py-1"><span className="text-muted mr-1">Environment Count:</span> {props.organization.envCount}</Col>
                <Col lg className="py-1"><span className="text-muted mr-1">Licenses:</span> {props.organization.numberOfLicenses}</Col>
              </Row>
              <Row className="mt-3">
                <Col lg className="py-1"><span className="text-muted mr-1">Objects:</span> {props.organization.objectCount}</Col>
                <Col lg className="py-1"><span className="text-muted mr-1">Subscription:</span> { props.organization.subscription ? props.organization.subscription.toString() : "" }</Col>
              </Row>
              <Row className="mt-3">
                <Col lg className="py-1"><span className="text-muted mr-1">Owner:</span> {props.organization.orgOwner}</Col>
                <Col lg className="py-1"><span className="text-muted mr-1">Owner Email:</span> {props.organization.name}</Col>
              </Row>
            </>)
            : null
        }
        
      </div>
    </>
  );
};

LdapOrganizationSummaryPanel.propTypes = {
  organization: PropTypes.object
};

export default LdapOrganizationSummaryPanel;
