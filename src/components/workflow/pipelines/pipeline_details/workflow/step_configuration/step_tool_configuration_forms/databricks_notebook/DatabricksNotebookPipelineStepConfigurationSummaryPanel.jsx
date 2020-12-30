import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import JsonField from "components/common/fields/json/JsonField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function DatabricksNotebookPipelineStepConfigurationSummaryPanel({ databricksNotebookPipelineStepData, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={12}>
          <TextFieldBase dataObject={databricksNotebookPipelineStepData} fieldName={"endpointUrl"} />
        </Col>
        {/*<Col lg={12}>*/}
        {/*  <TextFieldBase dataObject={databricksNotebookPipelineStepData} fieldName={"authToken"} />*/}
        {/*</Col>*/}
        <Col lg={12}>
          <JsonField dataObject={databricksNotebookPipelineStepData} fieldName={"dataPackage"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

DatabricksNotebookPipelineStepConfigurationSummaryPanel.propTypes = {
  databricksNotebookPipelineStepData: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default DatabricksNotebookPipelineStepConfigurationSummaryPanel;
