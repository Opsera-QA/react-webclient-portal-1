import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import PipelineTaskConsoleLogField from "components/common/fields/pipelines/activity/PipelineTaskConsoleLogField";

function TaskActivityConsoleLogPanel({ gitTaskActivityData }) {
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

TaskActivityConsoleLogPanel.propTypes = {
  gitTaskActivityData: PropTypes.object,
};


export default TaskActivityConsoleLogPanel;
