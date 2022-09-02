import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import BooleanField from "components/common/fields/boolean/BooleanField";
import VaultField from "components/common/fields/text/VaultField";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function GithubToolConfigurationSummaryPanel(
  {
    githubToolConfigurationModel,
  }) {
  const {
    isFreeTrial,
  } = useComponentStateReference();

  const getDynamicFields = () => {
    if (isFreeTrial !== true) {
      return (
        <>
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
        </>
      );
    }
  };

  if (githubToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Row>
      <Col lg={6}>
        <TextFieldBase dataObject={githubToolConfigurationModel} fieldName={"accountUsername"} />
      </Col>
      {getDynamicFields()}
    </Row>
  );
}

GithubToolConfigurationSummaryPanel.propTypes = {
  githubToolConfigurationModel: PropTypes.object,
};
