import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function HashicorpVaultToolConfigurationSummaryPanel({ hashicorpVaultToolConfigurationModel }) {
  if (hashicorpVaultToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <VaultField dataObject={hashicorpVaultToolConfigurationModel} fieldName={"vaultUri"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={hashicorpVaultToolConfigurationModel} fieldName={"vaultKey"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={hashicorpVaultToolConfigurationModel} fieldName={"vaultToken"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={hashicorpVaultToolConfigurationModel} fieldName={"vaultPath"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

HashicorpVaultToolConfigurationSummaryPanel.propTypes = {
  hashicorpVaultToolConfigurationModel: PropTypes.object,
};

export default HashicorpVaultToolConfigurationSummaryPanel;
