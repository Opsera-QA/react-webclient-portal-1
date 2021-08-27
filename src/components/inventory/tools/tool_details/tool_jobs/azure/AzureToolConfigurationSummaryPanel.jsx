import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function AzureToolConfigurationSummaryPanel({ azureToolConfigurationModel }) {
  if (azureToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <VaultField dataObject={azureToolConfigurationModel} fieldName={"subscriptionId"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={azureToolConfigurationModel} fieldName={"tenantId"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={azureToolConfigurationModel} fieldName={"applicationId"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={azureToolConfigurationModel} fieldName={"applicationPassword"} />
        </Col>
        {/*<Col lg={12}>*/}
        {/*  <VaultField dataObject={azureToolConfigurationModel} fieldName={"applicationKey"} />*/}
        {/*</Col>*/}
      </Row>
    </SummaryPanelContainer>
  );
}

AzureToolConfigurationSummaryPanel.propTypes = {
  azureToolConfigurationModel: PropTypes.object,
};

export default AzureToolConfigurationSummaryPanel;
