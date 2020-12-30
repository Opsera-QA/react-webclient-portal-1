import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function GcpPipelineStepConfigurationSummaryPanel({ gcpPipelineStepData, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={gcpPipelineStepData} fieldName={"buildScript"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

GcpPipelineStepConfigurationSummaryPanel.propTypes = {
  gcpPipelineStepData: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default GcpPipelineStepConfigurationSummaryPanel;
