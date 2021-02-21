import React from "react";
import PropTypes from "prop-types";
import AnchoreIntegratorStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/anchore_integrator/AnchoreIntegratorStepConfigurationSummaryPanel";
import anchoreIntegratorStepConfigurationMetadata
  from "./step_tool_configuration_forms/anchore_integrator/anchore-integrator-step-configuration-metadata";
import Model from "../../../../../../core/data_model/model";
import ReactJson from "react-json-view";
import ChildPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/child/ChildPipelineStepConfigurationSummaryPanel";
import childPipelineStepConfigurationMetadata
  from "./step_tool_configuration_forms/child/child-pipeline-step-configuration-metadata";
import AnchoreScanStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/anchore_scan/AnchoreScanStepConfigurationSummaryPanel";
import anchoreScanStepConfigurationMetadata
  from "./step_tool_configuration_forms/anchore_scan/anchore-scan-step-configuration-metadata";
import MockPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/mock/MockPipelineStepConfigurationSummaryPanel";
import mockPipelineStepConfigurationMetadata
  from "./step_tool_configuration_forms/mock/mock-pipeline-step-configuration-metadata";
import approvalGatePipelineStepConfigurationMetadata
  from "./step_tool_configuration_forms/approval_gate/approval-gate-pipeline-step-configuration-metadata";
import ApprovalGatePipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/approval_gate/ApprovalGatePipelineStepConfigurationSummaryPanel";
import SpinnakerPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/spinnaker/SpinnakerPipelineStepConfigurationSummaryPanel";
import spinnakerStepFormMetadata from "./step_tool_configuration_forms/spinnaker/spinnaker-stepForm-metadata";
import ArgoCDPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/argo_cd/ArgoCDPipelineStepConfigurationSummaryPanel";
import ArgoCDStepFormMetadata from "./step_tool_configuration_forms/argo_cd/argocd-stepForm-metadata";
import OctopusPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/octopus/OctopusPipelineStepConfigurationSummaryPanel";
import octopusStepFormMetadata from "./step_tool_configuration_forms/octopus/octopus-stepForm-metadata";
import NexusPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/nexus/NexusPipelineStepConfigurationSummaryPanel";
import nexusStepFormMetadata from "./step_tool_configuration_forms/nexus/nexus-stepForm-metadata";
import TeamCityPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/team_city/TeamCityPipelineStepConfigurationSummaryPanel";
import teamcityStepConfigurationMetadata
  from "./step_tool_configuration_forms/team_city/teamcity-step-configuration-metadata";
import TerraformPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/terraform/TerraformPipelineStepConfigurationSummaryPanel";
import TerraformStepFormMetadata from "./step_tool_configuration_forms/terraform/terraform-stepForm-metadata";
import ParallelProcessPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/parallel_processor/ParallelProcessPipelineStepConfigurationSummaryPanel";
import parallelProcessorPipelineStepConfigurationMetadata
  from "./step_tool_configuration_forms/parallel_processor/parallel-processor-pipeline-step-configuration-metadata";
import NpmPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/npm/NpmPipelineStepConfigurationSummaryPanel";
import npmPipelineStepConfigurationMetadata from "./step_tool_configuration_forms/npm/npm-step-configuration-metadata";
import ConditionalOperationPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/conditional_operation/ConditionalOperationPipelineStepConfigurationSummaryPanel";
import conditionalOperationStepConfigurationMetadata
  from "./step_tool_configuration_forms/conditional_operation/conditional-operation-step-configuration-metadata";
import AwsDeployPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/aws_deploy/AwsDeployPipelineStepConfigurationSummaryPanel";
import awsDeployPipelineStepConfigurationMetadata
  from "./step_tool_configuration_forms/aws_deploy/aws-deploy-step-configuration-metadata";
import DatabricksNotebookPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/databricks_notebook/DatabricksNotebookPipelineStepConfigurationSummaryPanel";
import databricksNotebookPipelineStepConfigurationMetadata
  from "./step_tool_configuration_forms/databricks_notebook/databricksNotebookPipelineStepConfigurationMetadata";
import SummaryPanelContainer from "../../../../../common/panels/detail_view/SummaryPanelContainer";
import ElasticBeanstalkDeployPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/elastic_beanstalk_deploy/ElasticBeanstalkDeployPipelineStepConfigurationSummaryPanel";
import elasticBeanstalkDeployPipelineStepConfigurationMetadata
  from "./step_tool_configuration_forms/elastic_beanstalk_deploy/elasticBeanstalkDeployPipelineStepConfigurationMetadata";
import ElasticBeanstalkPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/ebs/ElasticBeanstalkPipelineStepConfigurationSummaryPanel";
import ebsStepFormMetadata from "./step_tool_configuration_forms/ebs/ebs-stepForm-metadata";
import GcpPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/gcp/GcpPipelineStepConfigurationSummaryPanel";
import gcpPipelineStepConfigurationMetadata
  from "./step_tool_configuration_forms/gcp/gcpPipelineStepConfigurationMetadata";
import JenkinsPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/jenkins/JenkinsPipelineStepConfigurationSummaryPanel";
import jenkinsPipelineStepConfigurationMetadata
  from "./step_tool_configuration_forms/jenkins/jenkinsPipelineStepConfigurationMetadata";
import JunitPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/junit/JunitPipelineStepConfigurationSummaryPanel";
import junitPipelineStepConfigurationMetadata
  from "./step_tool_configuration_forms/junit/junitPipelineStepConfigurationMetadata";
import XUnitPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/xunit/XUnitPipelineStepConfigurationSummaryPanel";
import xunitPipelineStepConfigurationMetadata
  from "./step_tool_configuration_forms/xunit/xunitPipelineStepConfigurationMetadata";
import CommandLinePipelineStepConfigurationSummaryPanel from "./step_tool_configuration_forms/command_line/CommandLinePipelineStepConfigurationSummaryPanel";
import commandLineStepFormMetadata from "./step_tool_configuration_forms/command_line/commandline-stepForm-metadata";
import powershellStepFormMetadata from "./step_tool_configuration_forms/powershell/powershell-stepForm-metadata";
import PowershellPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/powershell/PowershellPipelineStepConfigurationSummaryPanel";
import SonarPipelineStepConfigurationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/SonarPipelineStepConfigurationSummaryPanel";
import sonarPipelineStepConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/sonarPipelineStepConfigurationMetadata";

function PipelineStepConfigurationSummary({
  pipelineData,
}) {
  const getModelWrappedObject = (metaData) => {
    return (new Model({...pipelineData?.tool?.configuration}, metaData, false))
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
      case "anchore-scan":
        return (
          <AnchoreScanStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            anchoreDataObject={getModelWrappedObject(anchoreScanStepConfigurationMetadata)}
          />
        );
      case "approval":
        return (
          <ApprovalGatePipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            approvalGatePipelineDataObject={getModelWrappedObject(approvalGatePipelineStepConfigurationMetadata)}
          />
        );
      case "argo":
        return (
          <ArgoCDPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            argoCdPipelineDataObject={getModelWrappedObject(ArgoCDStepFormMetadata)}
          />
        );
      case "aws-deploy":
        return (
          <AwsDeployPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            awsDeployPipelineDataObject={getModelWrappedObject(awsDeployPipelineStepConfigurationMetadata)}
          />
        );
      case "child-pipeline":
        return (
          <ChildPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            childPipelineDataObject={getModelWrappedObject(childPipelineStepConfigurationMetadata)}
          />
        );
      case "conditional-operator":
        return (
          <ConditionalOperationPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            conditionalOperationDataObject={getModelWrappedObject(conditionalOperationStepConfigurationMetadata)}
          />
        );
      case "databricks-notebook":
        return (
          <DatabricksNotebookPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            databricksNotebookPipelineStepData={getModelWrappedObject(databricksNotebookPipelineStepConfigurationMetadata)}
          />
        );
      case "elastic-beanstalk":
        return (
          <ElasticBeanstalkPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            elasticBeanstalkPipelineStepData={getModelWrappedObject(ebsStepFormMetadata)}
          />
        );
      case "gcp-deploy":
        return (
          <GcpPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            gcpPipelineStepData={getModelWrappedObject(gcpPipelineStepConfigurationMetadata)}
          />
        );
      case "jenkins":
        return (
          <JenkinsPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            jenkinsPipelineStepData={getModelWrappedObject(jenkinsPipelineStepConfigurationMetadata)}
          />
        );
      case "junit":
        return (
          <JunitPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            junitPipelineStepData={getModelWrappedObject(junitPipelineStepConfigurationMetadata)}
          />
        );
      case "mock-step":
        return (
          <MockPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            mockPipelineDataObject={getModelWrappedObject(mockPipelineStepConfigurationMetadata)}
          />
        );
      case "nexus":
        return (
          <NexusPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            nexusPipelineDataObject={getModelWrappedObject(nexusStepFormMetadata)}
          />
        );
      case "npm":
        return (
          <NpmPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            npmPipelineDataObject={getModelWrappedObject(npmPipelineStepConfigurationMetadata)}
          />
        );
      case "octopus":
        return (
          <OctopusPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            octopusPipelineDataObject={getModelWrappedObject(octopusStepFormMetadata)}
          />
        );
      case "parallel-processor":
        return (
          <ParallelProcessPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            parallelPipelineDataObject={getModelWrappedObject(parallelProcessorPipelineStepConfigurationMetadata)}
          />
        );
      case "spinnaker":
        return (
          <SpinnakerPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            spinnakerPipelineDataObject={getModelWrappedObject(spinnakerStepFormMetadata)}
          />
        );
      case "teamcity":
        return (
          <TeamCityPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            teamCityPipelineDataObject={getModelWrappedObject(teamcityStepConfigurationMetadata)}
          />
        );
      case "terraform":
        return (
          <TerraformPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            terraformPipelineDataObject={getModelWrappedObject(TerraformStepFormMetadata)}
          />
        );
      case "xunit":
        return (
          <XUnitPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            xunitPipelineStepData={getModelWrappedObject(xunitPipelineStepConfigurationMetadata)}
          />
        );
      case "command-line":
        return (
          <CommandLinePipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            commandLinePipelineDataObject={getModelWrappedObject(commandLineStepFormMetadata)}
          />
        );
      case "powershell":
        return (
          <PowershellPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            powershellPipelineDataObject={getModelWrappedObject(powershellStepFormMetadata)}
          />
        );
      case "sonar":
        return (
          <SonarPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            sonarDataObject={getModelWrappedObject(sonarPipelineStepConfigurationMetadata)}
          />
        );
      case "jmeter":
      case "selenium":
      case "twistlock":
      case "s3":
      case "ssh-upload":
      case "cypress":
      case "docker-push":
      case "sfdc-configurator":
      default:
        return (
          <SummaryPanelContainer>
            <ReactJson src={pipelineData?.tool} enableClipboard={false} displayDataTypes={false} collapsed={false}/>
          </SummaryPanelContainer>
        );
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
