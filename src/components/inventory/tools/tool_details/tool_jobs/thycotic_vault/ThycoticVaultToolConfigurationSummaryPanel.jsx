import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function ThycoticVaultToolConfigurationSummaryPanel({ thycoticVaultToolConfigurationModel }) {
  if (thycoticVaultToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={thycoticVaultToolConfigurationModel} fieldName={"tenantName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={thycoticVaultToolConfigurationModel} fieldName={"domainName"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={thycoticVaultToolConfigurationModel} fieldName={"clientId"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={thycoticVaultToolConfigurationModel} fieldName={"clientSecret"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={thycoticVaultToolConfigurationModel} fieldName={"vaultPath"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={thycoticVaultToolConfigurationModel} fieldName={"vaultType"} />
        </Col>        
      </Row>
    </SummaryPanelContainer>
  );
}

ThycoticVaultToolConfigurationSummaryPanel.propTypes = {
  thycoticVaultToolConfigurationModel: PropTypes.object,
};

export default ThycoticVaultToolConfigurationSummaryPanel;
