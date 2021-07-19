import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import JsonField from "components/common/fields/json/JsonField";

function AwsLambdaPipelineStepConfigurationSummaryPanel({ awsECSDeployPipelineDataObject, pipelineData, setActiveTab }) {
  if (awsECSDeployPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <JsonField dataObject={awsECSDeployPipelineDataObject} fieldName={"lambdaTasks"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AwsLambdaPipelineStepConfigurationSummaryPanel.propTypes = {
  awsECSDeployPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AwsLambdaPipelineStepConfigurationSummaryPanel;
