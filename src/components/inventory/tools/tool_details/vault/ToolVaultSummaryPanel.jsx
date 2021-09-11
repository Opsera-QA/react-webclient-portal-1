import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import ToolVaultField from "components/common/fields/inventory/tools/vault/ToolVaultField";

function ToolVaultSummaryPanel({ toolModel }) {
  if (toolModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <ToolVaultField model={toolModel} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ToolVaultSummaryPanel.propTypes = {
  toolModel: PropTypes.object,
};

export default ToolVaultSummaryPanel;
