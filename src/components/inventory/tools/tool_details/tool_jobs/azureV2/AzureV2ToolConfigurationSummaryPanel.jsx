import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";

function AzureV2ToolConfigurationSummaryPanel({ azureToolConfigurationModel }) {
  if (azureToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={azureToolConfigurationModel} fieldName={"azureSubscriptionId"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={azureToolConfigurationModel} fieldName={"azureTenantId"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

AzureV2ToolConfigurationSummaryPanel.propTypes = {
  azureToolConfigurationModel: PropTypes.object,
};

export default AzureV2ToolConfigurationSummaryPanel;
