import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

function RegisteredUserSummary({ userData, setActiveTab }) {
  // TODO: When User Settings panel is set up, pass setActiveTab to Summary Panel Container
  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <TextFieldBase fieldName={"firstName"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"lastName"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"email"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"_id"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"organizationName"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"domain"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"ssoSystem"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"ssoClientId"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase fieldName={"createdAt"} dataObject={userData}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase fieldName={"dbConnectionString"} dataObject={userData}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

RegisteredUserSummary.propTypes = {
  userData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default RegisteredUserSummary;





