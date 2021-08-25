import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import BooleanField from "components/common/fields/boolean/BooleanField";
import VaultField from "components/common/fields/text/VaultField";

function JenkinsToolConfigurationSummaryPanel({ jenkinsToolConfigurationModel }) {
  if (jenkinsToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsToolConfigurationModel} fieldName={"jenkinsUrl"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsToolConfigurationModel} fieldName={"jenkinsPort"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsToolConfigurationModel} fieldName={"jUserId"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={jenkinsToolConfigurationModel} fieldName={"jAuthToken"} />
        </Col>
        <Col lg={12}>
          <BooleanField dataObject={jenkinsToolConfigurationModel} fieldName={"proxyEnable"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={jenkinsToolConfigurationModel} fieldName={"proxyUserName"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={jenkinsToolConfigurationModel} fieldName={"proxyPassword"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={jenkinsToolConfigurationModel} fieldName={"jPassword"} />
        </Col>
        <Col lg={12}>
          <BooleanField dataObject={jenkinsToolConfigurationModel} fieldName={"autoScaleEnable"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

JenkinsToolConfigurationSummaryPanel.propTypes = {
  jenkinsToolConfigurationModel: PropTypes.object,
};

export default JenkinsToolConfigurationSummaryPanel;
