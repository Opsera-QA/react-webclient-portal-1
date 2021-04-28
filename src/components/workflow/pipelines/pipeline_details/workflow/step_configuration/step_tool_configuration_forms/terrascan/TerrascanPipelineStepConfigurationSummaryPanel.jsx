import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import JsonField from "components/common/fields/json/JsonField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function TerrascanPipelineStepConfigurationSummaryPanel({ terrascanLinePipelineDataObject, pipelineData, setActiveTab }) {
  if (terrascanLinePipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={terrascanLinePipelineDataObject} fieldName={"toolName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={terrascanLinePipelineDataObject} fieldName={"toolJobName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={terrascanLinePipelineDataObject} fieldName={"terrascanConfigFilePath"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={terrascanLinePipelineDataObject} fieldName={"platform"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={terrascanLinePipelineDataObject} fieldName={"repository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={terrascanLinePipelineDataObject} fieldName={"gitBranch"}/>
        </Col>
        <Col lg={6}>
          <JsonField dataObject={terrascanLinePipelineDataObject} fieldName={"rules"} />
        </Col>
        <Col lg={6}>
          <JsonField dataObject={terrascanLinePipelineDataObject} fieldName={"dependencyType"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

TerrascanPipelineStepConfigurationSummaryPanel.propTypes = {
  terrascanLinePipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default TerrascanPipelineStepConfigurationSummaryPanel;
