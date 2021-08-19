import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

function SsoUserSummaryPanel({ ssoUserData, setActiveTab } ) {
  if (ssoUserData == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={ssoUserData} fieldName={"firstName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ssoUserData} fieldName={"lastName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ssoUserData} fieldName={"email"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ssoUserData} fieldName={"organizationName"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

SsoUserSummaryPanel.propTypes = {
  ssoUserData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default SsoUserSummaryPanel;
