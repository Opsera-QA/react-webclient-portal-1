import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import SummaryPanelContainer from "../../../common/panels/detail_view/SummaryPanelContainer";

function RegisteredUserSummary({userData}) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={6}>
          <DtoTextField fieldName={"firstName"} dataObject={userData}/>
        </Col>
        <Col md={6}>
          <DtoTextField fieldName={"lastName"} dataObject={userData}/>
        </Col>
        <Col md={6}>
          <DtoTextField fieldName={"email"} dataObject={userData}/>
        </Col>
        <Col md={6}>
          <DtoTextField fieldName={"_id"} dataObject={userData}/>
        </Col>
        <Col md={6}>
          <DtoTextField fieldName={"organizationName"} dataObject={userData}/>
        </Col>
        <Col md={6}>
          <DtoTextField fieldName={"domain"} dataObject={userData}/>
        </Col>
        <Col md={6}>
          <DtoTextField fieldName={"ssoSystem"} dataObject={userData}/>
        </Col>
        <Col md={6}>
          <DtoTextField fieldName={"ssoClientId"} dataObject={userData}/>
        </Col>
        <Col md={6}>
          <DtoDateField fieldName={"createdAt"} dataObject={userData}/>
        </Col>
        <Col md={12}>
          <DtoTextField fieldName={"dbConnectionString"} dataObject={userData}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

RegisteredUserSummary.propTypes = {
  userData: PropTypes.object
};

export default RegisteredUserSummary;





