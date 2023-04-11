import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function OracleFusionToolConfigurationSummaryPanel({ oracleFusionToolConfigurationModel }) {
  if (oracleFusionToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>        
        <Col lg={12}>
          <TextFieldBase dataObject={oracleFusionToolConfigurationModel} fieldName={"toolURL"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionToolConfigurationModel} fieldName={"accountUsername"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={oracleFusionToolConfigurationModel} fieldName={"accountPassword"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

OracleFusionToolConfigurationSummaryPanel.propTypes = {
  oracleFusionToolConfigurationModel: PropTypes.object,
};

export default OracleFusionToolConfigurationSummaryPanel;
