import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import BooleanField from "components/common/fields/boolean/BooleanField";
import VaultField from "components/common/fields/text/VaultField";

function GithubToolConfigurationSummaryPanel({ githubToolConfigurationModel }) {
  if (githubToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={githubToolConfigurationModel} fieldName={"accountUsername"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={githubToolConfigurationModel} fieldName={"url"} />
        </Col>
        <Col lg={12}>
          <BooleanField dataObject={githubToolConfigurationModel} fieldName={"twoFactorAuthentication"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={githubToolConfigurationModel} fieldName={"jAuthToken"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={githubToolConfigurationModel} fieldName={"secretPrivateKey"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={githubToolConfigurationModel} fieldName={"secretAccessTokenKey"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={githubToolConfigurationModel} fieldName={"accountPassword"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

GithubToolConfigurationSummaryPanel.propTypes = {
  githubToolConfigurationModel: PropTypes.object,
};

export default GithubToolConfigurationSummaryPanel;
