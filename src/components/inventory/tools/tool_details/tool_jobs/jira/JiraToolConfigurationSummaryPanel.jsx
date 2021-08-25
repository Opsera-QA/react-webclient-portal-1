import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function JiraToolConfigurationSummaryPanel({ jiraToolConfigurationModel }) {
  if (jiraToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={jiraToolConfigurationModel} fieldName={"toolURL"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jiraToolConfigurationModel} fieldName={"jiraPort"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jiraToolConfigurationModel} fieldName={"userName"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={jiraToolConfigurationModel} fieldName={"vaultSecretKey"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

JiraToolConfigurationSummaryPanel.propTypes = {
  jiraToolConfigurationModel: PropTypes.object,
};

export default JiraToolConfigurationSummaryPanel;
