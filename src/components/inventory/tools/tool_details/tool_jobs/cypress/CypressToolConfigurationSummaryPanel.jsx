import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function CypressToolConfigurationSummaryPanel({ cypressToolConfigurationModel }) {
  if (cypressToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={cypressToolConfigurationModel} fieldName={"jUserId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={cypressToolConfigurationModel} fieldName={"jenkinsUrl"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={cypressToolConfigurationModel} fieldName={"jenkinsPort"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={cypressToolConfigurationModel} fieldName={"jAuthToken"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

CypressToolConfigurationSummaryPanel.propTypes = {
  cypressToolConfigurationModel: PropTypes.object,
};

export default CypressToolConfigurationSummaryPanel;
