import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const LdapOrganizationAccountDetails = (account) => {

  return (
    <>
      <Row className="mt-3">
        <Col lg className="py-1"><span className="text-muted mr-1">Name:</span> {account.name}</Col>
        <Col lg className="py-1"><span className="text-muted mr-1">Description:</span> {account.description}</Col>
      </Row>
      <Row className="mt-3">
        <Col lg className="py-1"><span className="text-muted mr-1">IDP Post URL:</span> {account.idpPostURL}</Col>
        <Col lg className="py-1"><span className="text-muted mr-1">IDP Vendor:</span> {account.idpVendor}</Col>
      </Row>
      <Row className="mt-3">
        <Col lg className="py-1"><span className="text-muted mr-1">IDP Return Attributes:</span> {account.idpReturnAttributes}</Col>
        <Col lg className="py-1"><span className="text-muted mr-1">Entity ID:</span> {account.entityID}</Col>
      </Row>
      <Row className="mt-3">
        <Col lg className="py-1"><span className="text-muted mr-1">Users:</span> {account.users ? <EntityList data={account.users} /> : ""}</Col>
        <Col lg className="py-1"><span className="text-muted mr-1">Groups:</span> {account.groups ? <EntityList data={account.groups} /> : ""}</Col>
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
