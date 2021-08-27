import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function NexusToolConfigurationSummaryPanel({ nexusToolConfigurationModel }) {
  if (nexusToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={nexusToolConfigurationModel} fieldName={"userName"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={nexusToolConfigurationModel} fieldName={"toolURL"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={nexusToolConfigurationModel} fieldName={"secretKey"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

NexusToolConfigurationSummaryPanel.propTypes = {
  nexusToolConfigurationModel: PropTypes.object,
};

export default NexusToolConfigurationSummaryPanel;
