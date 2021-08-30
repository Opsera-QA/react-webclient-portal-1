import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function OctopusToolConfigurationSummaryPanel({ octopusToolConfigurationModel }) {
  if (octopusToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={octopusToolConfigurationModel} fieldName={"userName"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={octopusToolConfigurationModel} fieldName={"toolURL"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={octopusToolConfigurationModel} fieldName={"octopusApiKey"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

OctopusToolConfigurationSummaryPanel.propTypes = {
  octopusToolConfigurationModel: PropTypes.object,
};

export default OctopusToolConfigurationSummaryPanel;
