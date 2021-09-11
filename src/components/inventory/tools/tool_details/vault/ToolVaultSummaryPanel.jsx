import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";

function ToolVaultSummaryPanel({ toolModel }) {
  if (toolModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={toolModel} fieldName={"vault"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ToolVaultSummaryPanel.propTypes = {
  toolModel: PropTypes.object,
};

export default ToolVaultSummaryPanel;
