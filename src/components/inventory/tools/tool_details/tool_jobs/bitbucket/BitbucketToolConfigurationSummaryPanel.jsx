import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import BooleanField from "components/common/fields/boolean/BooleanField";
import VaultField from "components/common/fields/text/VaultField";

function BitbucketToolConfigurationSummaryPanel({ bitbucketToolConfigurationModel }) {
  if (bitbucketToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={bitbucketToolConfigurationModel} fieldName={"accountUsername"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={bitbucketToolConfigurationModel} fieldName={"url"} />
        </Col>
        <Col lg={12}>
          <BooleanField dataObject={bitbucketToolConfigurationModel} fieldName={"twoFactorAuthentication"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={bitbucketToolConfigurationModel} fieldName={"secretPrivateKey"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={bitbucketToolConfigurationModel} fieldName={"secretAccessTokenKey"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={bitbucketToolConfigurationModel} fieldName={"accountPassword"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

BitbucketToolConfigurationSummaryPanel.propTypes = {
  bitbucketToolConfigurationModel: PropTypes.object,
};

export default BitbucketToolConfigurationSummaryPanel;
