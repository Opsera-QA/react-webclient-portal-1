import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function SonarToolConfigurationSummaryPanel({ sonarToolConfigurationModel }) {
  if (sonarToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={sonarToolConfigurationModel} fieldName={"sonarUserId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sonarToolConfigurationModel} fieldName={"sonarUrl"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sonarToolConfigurationModel} fieldName={"sonarPort"} />
        </Col>
        <Col lg={12}>
          <VaultField dataObject={sonarToolConfigurationModel} fieldName={"sonarAuthToken"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

SonarToolConfigurationSummaryPanel.propTypes = {
  sonarToolConfigurationModel: PropTypes.object,
};

export default SonarToolConfigurationSummaryPanel;
