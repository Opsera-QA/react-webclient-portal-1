import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function BuildkiteStepSummary({ buildkiteStepConfigurationData, pipelineData, setActiveTab }) {

  if (buildkiteStepConfigurationData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={buildkiteStepConfigurationData} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={buildkiteStepConfigurationData} fieldName={"pipeline"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={buildkiteStepConfigurationData} fieldName={"branch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={buildkiteStepConfigurationData} fieldName={"commit"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={buildkiteStepConfigurationData} fieldName={"message"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

BuildkiteStepSummary.propTypes = {
  buildkiteStepConfigurationData: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default BuildkiteStepSummary;
