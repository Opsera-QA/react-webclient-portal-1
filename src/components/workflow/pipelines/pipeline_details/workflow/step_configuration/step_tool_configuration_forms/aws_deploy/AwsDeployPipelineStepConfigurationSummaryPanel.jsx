import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import JsonField from "components/common/fields/json/JsonField";

function AwsDeployPipelineStepConfigurationSummaryPanel({ awsDeployPipelineDataObject, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={12}>
          <JsonField dataObject={awsDeployPipelineDataObject} fieldName={"buildScript"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AwsDeployPipelineStepConfigurationSummaryPanel.propTypes = {
  awsDeployPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AwsDeployPipelineStepConfigurationSummaryPanel;
