import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import BooleanField from "components/common/fields/boolean/BooleanField";
import VaultField from "components/common/fields/text/VaultField";

function SnykToolConfigurationSummaryPanel({ snykToolConfigurationModel }) {
  if (snykToolConfigurationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <TextFieldBase
            dataObject={snykToolConfigurationModel}
            fieldName={"connectivityType"}
          />
        </Col>
        <Col lg={6}>
          <VaultField
            dataObject={snykToolConfigurationModel}
            fieldName={"token"}
          />
        </Col>
        <Col lg={6}>
          <VaultField
            dataObject={snykToolConfigurationModel}
            fieldName={"organization"}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

SnykToolConfigurationSummaryPanel.propTypes = {
  snykToolConfigurationModel: PropTypes.object,
};

export default SnykToolConfigurationSummaryPanel;
