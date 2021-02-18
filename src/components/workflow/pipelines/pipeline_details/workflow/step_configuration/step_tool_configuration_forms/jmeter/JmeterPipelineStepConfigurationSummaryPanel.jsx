import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import JsonField from "components/common/fields/json/JsonField";

function JmeterPipelineStepConfigurationSummaryPanel({ jmeterDataObject, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={jmeterDataObject} fieldName={"toolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jmeterDataObject} fieldName={"jobType"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jmeterDataObject} fieldName={"jobName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jmeterDataObject} fieldName={"toolJobId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jmeterDataObject} fieldName={"gitCredential"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jmeterDataObject} fieldName={"workspace"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jmeterDataObject} fieldName={"repository"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jmeterDataObject} fieldName={"branch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jmeterDataObject} fieldName={"jmeterExportFileName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jmeterDataObject} fieldName={"jmeterFileName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jmeterDataObject} fieldName={"gitBranch"} />
        </Col>
        {/*<Col lg={6}>*/}
        {/*  <TextFieldBase dataObject={jmeterDataObject} fieldName={"stepIdXML"} />*/}
        {/*</Col>*/}
        <Col lg={6}>
          <TextFieldBase dataObject={jmeterDataObject} fieldName={"dockerName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jmeterDataObject} fieldName={"dockerTagName"} />
        </Col>
        <Col lg={6}>
          <JsonField dataObject={jmeterDataObject} fieldName={"buildArgs"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

JmeterPipelineStepConfigurationSummaryPanel.propTypes = {
  jmeterDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default JmeterPipelineStepConfigurationSummaryPanel;
