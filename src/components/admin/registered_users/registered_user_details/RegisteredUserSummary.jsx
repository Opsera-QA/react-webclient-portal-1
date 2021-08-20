import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import GroupField from "components/common/fields/multiple_items/GroupField";
import SmartIdField from "components/common/fields/text/id/SmartIdField";

function RegisteredUserSummary({ userData, setActiveTab, showDbConnectionString, userAccess }) {
  const getConnectionString = () => {
    if (showDbConnectionString) {
      return (
        <Col lg={12}>
          <TextFieldBase fieldName={"dbConnectionString"} dataObject={userData}/>
        </Col>
      );
    }
  };

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
          <SmartIdField fieldName={"_id"} model={userData}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"organizationName"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"title"} dataObject={userData}/>
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
        <Col lg={12}>
          <GroupField fieldName={"groups"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase fieldName={"createdAt"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase fieldName={"updatedAt"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <label className="mb-0 mr-2 text-muted">Access Role:</label>
          {userAccess?.Role}
        </Col>
        {getConnectionString()}
      </Row>
    </SummaryPanelContainer>
  );
}

RegisteredUserSummary.propTypes = {
  userData: PropTypes.object,
  setActiveTab: PropTypes.func,
  showDbConnectionString: PropTypes.bool,
  userAccess: PropTypes.object
};

export default RegisteredUserSummary;





