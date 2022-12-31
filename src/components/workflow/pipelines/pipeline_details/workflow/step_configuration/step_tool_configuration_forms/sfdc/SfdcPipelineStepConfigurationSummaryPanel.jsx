import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import BooleanField from "components/common/fields/boolean/BooleanField";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function SfdcPipelineStepConfigurationSummaryPanel({ sfdcDataObject, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={sfdcDataObject} fieldName={"toolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcDataObject} fieldName={"jenkinsUrl"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcDataObject} fieldName={"service"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcDataObject} fieldName={"accountId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcDataObject} fieldName={"username"} />
        </Col>
        {/*<Col lg={6}>*/}
        {/*  <TextFieldBase dataObject={sfdcDataObject} fieldName={"repository"} />*/}
        {/*</Col>*/}
        <Col lg={6}>
          <TextFieldBase dataObject={sfdcDataObject} fieldName={"branch"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={sfdcDataObject} fieldName={"trigger_active"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

SfdcPipelineStepConfigurationSummaryPanel.propTypes = {
  sfdcDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default SfdcPipelineStepConfigurationSummaryPanel;
