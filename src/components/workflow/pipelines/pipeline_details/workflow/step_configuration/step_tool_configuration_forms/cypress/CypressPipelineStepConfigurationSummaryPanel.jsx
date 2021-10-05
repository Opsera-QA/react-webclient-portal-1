import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import JsonField from "components/common/fields/json/JsonField";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function CypressPipelineStepConfigurationSummaryPanel({ cypressDataObject, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={cypressDataObject} fieldName={"toolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={cypressDataObject} fieldName={"jobType"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={cypressDataObject} fieldName={"jobName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={cypressDataObject} fieldName={"toolJobId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={cypressDataObject} fieldName={"gitCredential"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={cypressDataObject} fieldName={"workspaceName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={cypressDataObject} fieldName={"repository"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={cypressDataObject} fieldName={"branch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={cypressDataObject} fieldName={"gitBranch"} />
        </Col>
        {/*<Col lg={6}>*/}
        {/*  <TextFieldBase dataObject={cypressDataObject} fieldName={"stepIdXML"} />*/}
        {/*</Col>*/}
        <Col lg={6}>
          <TextFieldBase dataObject={cypressDataObject} fieldName={"dockerName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={cypressDataObject} fieldName={"dockerTagName"} />
        </Col>
        <Col lg={6}>
          <JsonField dataObject={cypressDataObject} fieldName={"buildArgs"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

CypressPipelineStepConfigurationSummaryPanel.propTypes = {
  cypressDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default CypressPipelineStepConfigurationSummaryPanel;
