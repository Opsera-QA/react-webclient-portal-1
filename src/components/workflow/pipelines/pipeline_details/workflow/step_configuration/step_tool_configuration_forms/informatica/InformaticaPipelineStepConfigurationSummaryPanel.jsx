import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function InformaticaPipelineStepConfigurationSummaryPanel({ informaticaPipelineDataObject, pipelineData, setActiveTab }) {

  if (informaticaPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaPipelineDataObject} fieldName={"buildStepId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaPipelineDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaPipelineDataObject} fieldName={"workspace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaPipelineDataObject} fieldName={"repository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaPipelineDataObject} fieldName={"gitBranch"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

InformaticaPipelineStepConfigurationSummaryPanel.propTypes = {
  informaticaPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default InformaticaPipelineStepConfigurationSummaryPanel;
