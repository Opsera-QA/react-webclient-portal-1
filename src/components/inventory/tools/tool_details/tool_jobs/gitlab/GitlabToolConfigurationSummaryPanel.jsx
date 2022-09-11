import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import BooleanField from "components/common/fields/boolean/BooleanField";
import VaultField from "components/common/fields/text/VaultField";

export default function GitlabToolConfigurationSummaryPanel({ gitlabToolConfigurationModel }) {
  if (gitlabToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Row>
      <Col lg={6}>
        <TextFieldBase dataObject={gitlabToolConfigurationModel} fieldName={"accountUsername"} />
      </Col>
      <Col lg={12}>
        <TextFieldBase dataObject={gitlabToolConfigurationModel} fieldName={"url"} />
      </Col>
      <Col lg={12}>
        <BooleanField dataObject={gitlabToolConfigurationModel} fieldName={"twoFactorAuthentication"} />
      </Col>
      <Col lg={6}>
        <VaultField dataObject={gitlabToolConfigurationModel} fieldName={"secretPrivateKey"} />
      </Col>
      <Col lg={6}>
        <VaultField dataObject={gitlabToolConfigurationModel} fieldName={"secretAccessTokenKey"} />
      </Col>
      <Col lg={12}>
        <VaultField dataObject={gitlabToolConfigurationModel} fieldName={"accountPassword"} />
      </Col>
    </Row>
  );
}

GitlabToolConfigurationSummaryPanel.propTypes = {
  gitlabToolConfigurationModel: PropTypes.object,
};
