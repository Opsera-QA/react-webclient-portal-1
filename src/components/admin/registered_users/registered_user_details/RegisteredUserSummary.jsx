import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import SummaryActionBar from "../../../common/actions/SummaryActionBar";
import paths from "../../../common/navigation/paths";
import ModalActivityLogs from "../../../common/modal/modalActivityLogs";

function RegisteredUserSummary({userData}) {
  const [showModal, setShowModal] = useState(false);

  const getUserData = async () => {
      setShowModal(true);
  }

  return (
    <div className="scroll-y pt-3 px-3">
      <SummaryActionBar backButtonPath={`/${paths.registeredUsersManagement}`} handleDetailsClick={getUserData} />
      <div className="mb-3 flat-top-content-block p-3">
        <Row>
          <Col md={6}>
            <DtoTextField fieldName={"firstName"} dataObject={userData} />
          </Col>
          <Col md={6}>
            <DtoTextField fieldName={"lastName"} dataObject={userData} />
          </Col>
          <Col md={6}>
            <DtoTextField fieldName={"email"} dataObject={userData} />
          </Col>
          <Col md={6}>
            <DtoTextField fieldName={"_id"} dataObject={userData} />
          </Col>
          <Col md={6}>
            <DtoTextField fieldName={"organizationName"} dataObject={userData} />
          </Col>
          <Col md={6}>
            <DtoTextField fieldName={"domain"} dataObject={userData} />
          </Col>
          <Col md={6}>
            <DtoTextField fieldName={"ssoSystem"} dataObject={userData} />
          </Col>
          <Col md={6}>
            <DtoTextField fieldName={"ssoClientId"} dataObject={userData} />
          </Col>
          <Col md={6}>
            <DtoDateField fieldName={"createdAt"} dataObject={userData} />
          </Col>
          <Col md={12}>
            <DtoTextField fieldName={"dbConnectionString"} dataObject={userData} />
          </Col>
        </Row>
      </div>
      <ModalActivityLogs header="User Information" size="lg" jsonData={userData["data"]} show={showModal} setParentVisibility={setShowModal} />
    </div>
  );
}

RegisteredUserSummary.propTypes = {
  userData: PropTypes.object
};

export default RegisteredUserSummary;





