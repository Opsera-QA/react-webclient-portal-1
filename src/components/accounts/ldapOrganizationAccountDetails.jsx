import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap, faUserCircle, faUserFriends, faUser } from "@fortawesome/free-solid-svg-icons";

const LdapOrganizationAccountDetails = (props) => {

  return (
    <>
      <Row className="mt-3">
        <Col lg className="py-1"><span className="text-muted mr-1">Name:</span> {props.account.name}</Col>
        <Col lg className="py-1"><span className="text-muted mr-1">Description:</span> {props.account.description}</Col>
      </Row>
      <Row className="mt-3">
        <Col lg className="py-1"><span className="text-muted mr-1">IDP Post URL:</span> {props.account.idpPostURL}</Col>
        <Col lg className="py-1"><span className="text-muted mr-1">IDP Vendor:</span> {props.account.idpVendor}</Col>
      </Row>
      <Row className="mt-3">
        <Col lg className="py-1"><span className="text-muted mr-1">IDP Return Attributes:</span> {props.account.idpReturnAttributes}</Col>
        <Col lg className="py-1"><span className="text-muted mr-1">Entity ID:</span> {props.account.entityID}</Col>
      </Row>
      <Row className="mt-3">
        <Col lg className="py-1"><span className="text-muted mr-1">Users:</span> {props.account.users ? <EntityList data={props.account.users} /> : ""}</Col>
        <Col lg className="py-1"><span className="text-muted mr-1">Groups:</span> {props.account.groups ? <EntityList data={props.account.groups} /> : ""}</Col>
      </Row>
    </>
  );
  
};

LdapOrganizationAccountDetails.propTypes = {
  account: PropTypes.object
};

const EntityList = (props) => {
  return (
    <ul className="list-group">
      { props.data.map((entity) => <li className="list-group-item" key={entity.name}>{entity.name}</li>) }
    </ul>
  );
};
EntityList.propTypes = {
  data: PropTypes.array
};

export default LdapOrganizationAccountDetails;
