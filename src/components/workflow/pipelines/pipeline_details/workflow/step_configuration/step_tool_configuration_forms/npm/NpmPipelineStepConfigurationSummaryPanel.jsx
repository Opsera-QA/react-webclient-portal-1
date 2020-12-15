import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import TextFieldBase from "../../../../../../../common/form_fields/TextFieldBase";

function NpmPipelineStepConfigurationSummaryPanel({ npmPipelineDataObject, pipelineData, setActiveTab }) {

  if (npmPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row className={"pb-2"}>
        <Col lg={6}>
          <TextFieldBase dataObject={npmPipelineDataObject} fieldName={"commands"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={npmPipelineDataObject} fieldName={"path"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

NpmPipelineStepConfigurationSummaryPanel.propTypes = {
  npmPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default NpmPipelineStepConfigurationSummaryPanel;
