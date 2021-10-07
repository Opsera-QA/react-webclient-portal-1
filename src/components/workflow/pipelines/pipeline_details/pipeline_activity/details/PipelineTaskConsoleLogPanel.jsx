import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import PipelineTaskConsoleLogField from "components/common/fields/pipelines/activity/PipelineTaskConsoleLogField";

function PipelineTaskConsoleLogPanel({ pipelineTaskData }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={12}>
          <PipelineTaskConsoleLogField dataObject={pipelineTaskData} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineTaskConsoleLogPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};


export default PipelineTaskConsoleLogPanel;
