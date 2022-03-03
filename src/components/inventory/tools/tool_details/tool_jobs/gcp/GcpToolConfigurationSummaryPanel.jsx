import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function GcpToolConfigurationSummaryPanel({ gcpToolConfigurationModel }) {
  if (gcpToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>        
        <Col lg={12}>
          <TextFieldBase dataObject={gcpToolConfigurationModel} fieldName={"fileName"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={gcpToolConfigurationModel} fieldName={"license"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

GcpToolConfigurationSummaryPanel.propTypes = {
  gcpToolConfigurationModel: PropTypes.object,
};

export default GcpToolConfigurationSummaryPanel;
