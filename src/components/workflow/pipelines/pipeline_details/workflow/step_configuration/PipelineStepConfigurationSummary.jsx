import React from "react";
import PropTypes from "prop-types";
import AnchoreIntegratorStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/anchore_integrator/AnchoreIntegratorStepConfigurationSummaryPanel";
import anchoreIntegratorStepConfigurationMetadata
  from "./step_tool_configuration_forms/anchore_integrator/anchore-integrator-step-configuration-metadata";
import Model from "../../../../../../core/data_model/model";
import ReactJson from "react-json-view";
import TextField from "../../../../../common/form_fields/text-field";
import {Col, Row} from "react-bootstrap";
import ChildPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/child/ChildPipelineStepConfigurationSummaryPanel";
import childPipelineStepConfigurationMetadata
  from "./step_tool_configuration_forms/child/child-pipeline-step-configuration-metadata";
import AnchoreScanStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/anchore_scan/AnchoreScanStepConfigurationSummaryPanel";
import anchoreScanStepConfigurationMetadata
  from "./step_tool_configuration_forms/anchore_scan/anchore-scan-step-configuration-metadata";
import MockPipelineStepConfiguration from "./step_tool_configuration_forms/mock/MockPipelineStepConfiguration";
import MockPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/mock/MockPipelineStepConfigurationSummaryPanel";
import mockPipelineStepConfigurationMetadata
  from "./step_tool_configuration_forms/mock/mock-pipeline-step-configuration-metadata";

function PipelineStepConfigurationSummary({
  pipelineData,
}) {
  const getModelWrappedObject = (metaData) => {
    return (new Model({...pipelineData.tool.configuration}, metaData, false))
  };
  // TODO: Pass in already wrapped data object?
  const getStepConfigurationSummary = () => {
    switch (pipelineData?.tool?.tool_identifier) {
      case "anchore-integrator":
        return (
          <AnchoreIntegratorStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            anchoreDataObject={getModelWrappedObject(anchoreIntegratorStepConfigurationMetadata)}
          />
        );
      case "child-pipeline":
        return (
          <ChildPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            childPipelineDataObject={getModelWrappedObject(childPipelineStepConfigurationMetadata)}
          />
        );
      case "anchore-scan":
        return (
          <AnchoreScanStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            anchoreDataObject={getModelWrappedObject(anchoreScanStepConfigurationMetadata)}
          />
        );
      case "mock-step":
        return (
          <MockPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            mockPipelineDataObject={getModelWrappedObject(mockPipelineStepConfigurationMetadata)}
          />
        );
      case "jenkins":
      case "junit":
      case "xunit":
      case "sonar":
      case "command-line":
      case "npm":
      case "teamcity":
      case "jmeter":
      case "selenium":
      case "twistlock":
      case "aws-deploy":
      case "gcp-deploy":
      case "s3":
      case "databricks-notebook":
      case "ssh-upload":
      case "spinnaker":
      case "approval":
      case "cypress":
      case "docker-push":
      case "argo":
      case "sfdc-configurator":
      case "nexus":
      case "octopus":
      case "terraform":
      case "elastic-beanstalk":
      default:
        return <ReactJson src={pipelineData?.tool} enableClipboard={false} displayDataTypes={false} collapsed={false}/>;
    }
  }

  return (
    <div>
      {getStepConfigurationSummary()}
    </div>
  );
}

PipelineStepConfigurationSummary.propTypes = {
  pipelineData: PropTypes.object,
};

export default PipelineStepConfigurationSummary;
