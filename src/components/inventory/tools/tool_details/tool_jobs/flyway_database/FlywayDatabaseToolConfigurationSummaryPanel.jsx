import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function FlywayDatabaseToolConfigurationSummaryPanel({ flywayToolConfigurationModel }) {
  if (flywayToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={flywayToolConfigurationModel} fieldName={"userName"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={flywayToolConfigurationModel} fieldName={"url"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={flywayToolConfigurationModel} fieldName={"port"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={flywayToolConfigurationModel} fieldName={"password"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={flywayToolConfigurationModel} fieldName={"buildType"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

FlywayDatabaseToolConfigurationSummaryPanel.propTypes = {
  flywayToolConfigurationModel: PropTypes.object,
};

export default FlywayDatabaseToolConfigurationSummaryPanel;
