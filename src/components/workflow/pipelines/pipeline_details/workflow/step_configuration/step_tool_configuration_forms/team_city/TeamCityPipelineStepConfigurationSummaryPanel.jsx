import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function TeamCityPipelineStepConfigurationSummaryPanel({ teamCityPipelineDataObject, pipelineData, setActiveTab }) {

  if (teamCityPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={teamCityPipelineDataObject} fieldName={"teamcityApiURL"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={teamCityPipelineDataObject} fieldName={"teamcityUsername"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={teamCityPipelineDataObject} fieldName={"teamcityBuildTypeId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={teamCityPipelineDataObject} fieldName={"teamcityProjectId"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

TeamCityPipelineStepConfigurationSummaryPanel.propTypes = {
  teamCityPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default TeamCityPipelineStepConfigurationSummaryPanel;
