import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import VaultField from "components/common/fields/text/VaultField";

function TeamsToolConfigurationSummaryPanel({ teamsToolConfigurationModel }) {
  if (teamsToolConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <VaultField dataObject={teamsToolConfigurationModel} fieldName={"webhookUrl"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

TeamsToolConfigurationSummaryPanel.propTypes = {
  teamsToolConfigurationModel: PropTypes.object,
};

export default TeamsToolConfigurationSummaryPanel;
