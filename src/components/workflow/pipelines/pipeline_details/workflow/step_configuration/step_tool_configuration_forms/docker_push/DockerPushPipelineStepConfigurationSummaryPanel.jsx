import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import JsonField from "components/common/fields/json/JsonField";

function DockerPushPipelineStepConfigurationSummaryPanel({ dockerPushDataObject, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerPushDataObject} fieldName={"toolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerPushDataObject} fieldName={"awsToolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerPushDataObject} fieldName={"jobType"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerPushDataObject} fieldName={"buildStepId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerPushDataObject} fieldName={"jobName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerPushDataObject} fieldName={"ecrRepoName"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

DockerPushPipelineStepConfigurationSummaryPanel.propTypes = {
  dockerPushDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default DockerPushPipelineStepConfigurationSummaryPanel;
