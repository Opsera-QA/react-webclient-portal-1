import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../../../../common/form_fields/dto_form_fields/dto-text-field";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";

function ChildPipelineStepConfigurationSummaryPanel({ childPipelineDataObject, pipelineData, setActiveTab }) {

  if (childPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={childPipelineDataObject} fieldName={"pipelineId"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ChildPipelineStepConfigurationSummaryPanel.propTypes = {
  childPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default ChildPipelineStepConfigurationSummaryPanel;
