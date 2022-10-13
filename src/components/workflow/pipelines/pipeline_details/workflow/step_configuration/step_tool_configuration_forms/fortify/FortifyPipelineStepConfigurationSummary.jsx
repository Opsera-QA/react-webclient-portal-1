import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import JsonField from "components/common/fields/json/JsonField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function FortifyPipelineStepConfigurationSummary({ fortifyPipelineDataObject, pipelineData, setActiveTab }) {
  if (fortifyPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={fortifyPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyPipelineDataObject} fieldName={"jobType"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyPipelineDataObject} fieldName={"database"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyPipelineDataObject} fieldName={"warehouse"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyPipelineDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={fortifyPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyPipelineDataObject} fieldName={"workspace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyPipelineDataObject} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyPipelineDataObject} fieldName={"gitBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyPipelineDataObject} fieldName={"scriptFilePath"}/>
        </Col>        
        <Col lg={6}>
          <TextFieldBase dataObject={fortifyPipelineDataObject} fieldName={"baseSchema"}/>
        </Col>        
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

FortifyPipelineStepConfigurationSummary.propTypes = {
  fortifyPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default FortifyPipelineStepConfigurationSummary;
