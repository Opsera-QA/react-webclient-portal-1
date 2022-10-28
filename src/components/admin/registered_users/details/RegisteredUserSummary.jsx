import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import GroupField from "components/common/fields/multiple_items/GroupField";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import SiteRoleField from "components/common/fields/access/SiteRoleField";
import EmailAddressField from "components/common/fields/text/email/EmailAddressField";

function RegisteredUserSummary({ userData, setActiveTab, showDbConnectionString }) {

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
    <SummaryPanelContainer className={"m-3"}>
      <Row>
        <Col lg={6}>
          <TextFieldBase fieldName={"firstName"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"lastName"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <EmailAddressField fieldName={"email"} model={userData}/>
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
        <Col lg={12}>
          <TextFieldBase fieldName={"domain"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"ssoSystem"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase showClipboardButton={true} fieldName={"ssoClientId"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase fieldName={"createdAt"} dataObject={userData}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase fieldName={"updatedAt"} dataObject={userData}/>
        </Col>
        <Col lg={12}>
          <SiteRoleField />
        </Col>
        <Col lg={12}>
          <GroupField fieldName={"groups"} dataObject={userData}/>
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





