import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import JsonField from "components/common/fields/json/JsonField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function SnaplogicPipelineStepConfigurationSummary({ snaplogicPipelineDataObject, pipelineData, setActiveTab }) {
  if (snaplogicPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={snaplogicPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={snaplogicPipelineDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={snaplogicPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={snaplogicPipelineDataObject} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={snaplogicPipelineDataObject} fieldName={"projectId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={snaplogicPipelineDataObject} fieldName={"gitBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={snaplogicPipelineDataObject} fieldName={"projectSpace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={snaplogicPipelineDataObject} fieldName={"project"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

SnaplogicPipelineStepConfigurationSummary.propTypes = {
  snaplogicPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default SnaplogicPipelineStepConfigurationSummary;
