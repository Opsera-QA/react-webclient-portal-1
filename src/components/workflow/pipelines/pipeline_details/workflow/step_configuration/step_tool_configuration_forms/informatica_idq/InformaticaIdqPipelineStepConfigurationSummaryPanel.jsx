import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ToolNameField from "../../../../../../../common/fields/inventory/ToolNameField";

function InformaticaIdqPipelineStepConfigurationSummaryPanel({ informaticaIdqPipelineDataObject, pipelineData, setActiveTab }) {

  if (informaticaIdqPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField dataObject={informaticaIdqPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaIdqPipelineDataObject} fieldName={"jobType"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaIdqPipelineDataObject} fieldName={"sourceProject"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaIdqPipelineDataObject} fieldName={"sourcePaths"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaIdqPipelineDataObject} fieldName={"exportStepId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaIdqPipelineDataObject} fieldName={"targetProject"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaIdqPipelineDataObject} fieldName={"importStepId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaIdqPipelineDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField dataObject={informaticaIdqPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaIdqPipelineDataObject} fieldName={"workspace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaIdqPipelineDataObject} fieldName={"repository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={informaticaIdqPipelineDataObject} fieldName={"gitBranch"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

InformaticaIdqPipelineStepConfigurationSummaryPanel.propTypes = {
  informaticaIdqPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default InformaticaIdqPipelineStepConfigurationSummaryPanel;
