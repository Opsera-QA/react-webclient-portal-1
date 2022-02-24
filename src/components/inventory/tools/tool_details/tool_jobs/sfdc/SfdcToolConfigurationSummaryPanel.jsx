import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";
import BooleanField from "components/common/fields/boolean/BooleanField";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function SfdcToolConfigurationSummaryPanel({ sfdcToolConfigurationModel }) {
  if (sfdcToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={sfdcToolConfigurationModel} fieldName={"accountUsername"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={sfdcToolConfigurationModel} fieldName={"toolURL"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={sfdcToolConfigurationModel} fieldName={"buildType"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={sfdcToolConfigurationModel} fieldName={"sfdc_client_id"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={sfdcToolConfigurationModel} fieldName={"sfdc_client_secret"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={sfdcToolConfigurationModel} fieldName={"sfdc_token"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={sfdcToolConfigurationModel} fieldName={"sfdc_password"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

SfdcToolConfigurationSummaryPanel.propTypes = {
  sfdcToolConfigurationModel: PropTypes.object,
};

export default SfdcToolConfigurationSummaryPanel;
