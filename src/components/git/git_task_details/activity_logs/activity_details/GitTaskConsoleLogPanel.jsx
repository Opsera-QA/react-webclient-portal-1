import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SummaryPanelContainer from "../../../../common/panels/detail_view/SummaryPanelContainer";
import PipelineTaskConsoleLogField from "../../../../common/form_fields/pipelines/activity/PipelineTaskConsoleLogField";

function GitTaskActivityConsoleLogPanel({ gitTaskActivityData }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={12}>
          <PipelineTaskConsoleLogField dataObject={gitTaskActivityData} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

GitTaskActivityConsoleLogPanel.propTypes = {
  gitTaskActivityData: PropTypes.object,
};


export default GitTaskActivityConsoleLogPanel;
