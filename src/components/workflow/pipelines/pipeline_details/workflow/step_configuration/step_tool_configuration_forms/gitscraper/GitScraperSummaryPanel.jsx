import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import BooleanField from "../../../../../../../common/fields/boolean/BooleanField";
import JsonField from "../../../../../../../common/fields/json/JsonField";

function GitScraperSummaryPanel({ gitScraperPipelineDataObject, pipelineData, setActiveTab }) {
  if (gitScraperPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={gitScraperPipelineDataObject} fieldName={"repository"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={gitScraperPipelineDataObject} fieldName={"gitBranch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={gitScraperPipelineDataObject} fieldName={"gitToolId"} />
        </Col>
        {/*<Col lg={6}>*/}
        {/*  <TextFieldBase dataObject={gitScraperPipelineDataObject} fieldName={"type"} />*/}
        {/*</Col>*/}
        <Col lg={6}>
          <TextFieldBase dataObject={gitScraperPipelineDataObject} fieldName={"service"} />
        </Col>
        {/*<Col lg={6}>*/}
        {/*  <TextFieldBase dataObject={gitScraperPipelineDataObject} fieldName={"commits"} />*/}
        {/*</Col>*/}
        <Col lg={6}>
          <TextFieldBase dataObject={gitScraperPipelineDataObject} fieldName={"threshold"} />
        </Col>{" "}
        <Col lg={6}>
          <JsonField dataObject={gitScraperPipelineDataObject} fieldName={"excludeSecrets"} />
        </Col>{" "}
        <Col lg={6}>
          <JsonField dataObject={gitScraperPipelineDataObject} fieldName={"excludeFiles"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={gitScraperPipelineDataObject} fieldName={"secretsException"} />
        </Col>{" "}
        <Col lg={6}>
          <BooleanField dataObject={gitScraperPipelineDataObject} fieldName={"filesException"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

GitScraperSummaryPanel.propTypes = {
  gitScraperPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default GitScraperSummaryPanel;
