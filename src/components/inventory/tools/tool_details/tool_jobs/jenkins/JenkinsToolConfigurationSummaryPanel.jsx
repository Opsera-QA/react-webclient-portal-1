import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import BooleanField from "components/common/fields/boolean/BooleanField";
import VaultField from "components/common/fields/text/VaultField";

function JenkinsToolConfigurationSummaryPanel({ accessToken }) {
  if (accessToken == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={accessToken} fieldName={"jenkinsUrl"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={accessToken} fieldName={"jenkinsPort"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={accessToken} fieldName={"jUserId"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={accessToken} fieldName={"jAuthToken"} />
        </Col>
        <Col lg={12}>
          <BooleanField dataObject={accessToken} fieldName={"proxyEnable"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={accessToken} fieldName={"proxyUserName"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={accessToken} fieldName={"proxyPassword"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={accessToken} fieldName={"jPassword"} />
        </Col>
        <Col lg={12}>
          <BooleanField dataObject={accessToken} fieldName={"autoScaleEnable"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

JenkinsToolConfigurationSummaryPanel.propTypes = {
  accessToken: PropTypes.object,
};

export default JenkinsToolConfigurationSummaryPanel;
