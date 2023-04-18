import React from "react";
import PropTypes from "prop-types";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import AzureDevopsPipelineStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/AzureDevopsPipelineStepConfigurationHelpDocumentation";
import PipelineStepSetupHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/PipelineStepSetupHelpDocumentation";
import DockerEcrPushStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/DockerEcrPushStepConfigurationHelpDocumentation";
import AwsEcsDeployStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/AwsEcsDeployStepConfigurationHelpDocumentation";
import AzureAksDeployPipelineStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/AzureAksDeployPipelineStepConfigurationHelpDocumentation";
import AzureAcrPushPipelineStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/AzureAcrPushPipelineStepConfigurationHelpDocumentation";
import OctopusDeployStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/OctopusDeployStepConfigurationHelpDocumentation";
import AnsibleStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/AnsibleStepConfigurationHelpDocumentation";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import ApprovalGateStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/ApprovalGateStepConfigurationHelpDocumentation";
import ExternalApiIntegratorHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/ExternalApiIntegratorHelpDocumentation";
import SonarQubeStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/SonarQubeStepConfigurationHelpDocumentation";
import ServiceNowHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/ServiceNowHelpDocumentation";
import GitCustodianStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/GitCustodianStepConfigurationHelpDocumentation";
import AquaSecStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/AquaSecStepConfigurationHelpDocumentation";
import FortifyStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/FortifyStepConfigurationHelpDocumentation";
import BlackDuckStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/BlackDuckStepConfigurationHelpDocumentation";
import SnykStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/SnykStepConfigurationHelpDocumentation";
import TwistlockStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/TwistlockStepConfigurationHelpDocumentation";
import ChildStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/ChildStepConfigurationHelpDocumentation";
import ParallelProcessorStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/ParallelProcessorStepConfigurationHelpDocumentation";
import AnchoreIntegratorConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/AnchoreIntegratorConfigurationHelpDocumentation";
import TerraformStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/TerraformStepConfigurationHelpDocumentation";
import AwsLambdaStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/AwsLambdaStepConfigurationHelpDocumentation";
import CoverityStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/CoverityStepConfigurationHelpDocumentation";
import SentinelStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/SentinelStepConfigurationHelpDocumentation";
import TerrascanStepConfigurationHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/TerrascanStepConfigurationHelpDocumentation";

function StepToolHelpIcon({type, tool, className, iconClassName}) {
  // TODO: Alphabetize when adding new help panels
  const getToolHelpPanel = () => {
    switch (tool) {
      case "ansible":
        return <AnsibleStepConfigurationHelpDocumentation/>;
      case "anchore-integrator":
        return <AnchoreIntegratorConfigurationHelpDocumentation/>;
      case "approval":
        return <ApprovalGateStepConfigurationHelpDocumentation/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.AQUASEC:
        return <AquaSecStepConfigurationHelpDocumentation/>;
      case "aws_ecs_deploy":
        return <AwsEcsDeployStepConfigurationHelpDocumentation/>;
      case "aws_lambda":
        return <AwsLambdaStepConfigurationHelpDocumentation/>;
      case "azure-devops":
        return <AzureDevopsPipelineStepConfigurationHelpDocumentation/>;
      case "azure_aks_deploy":
        return <AzureAksDeployPipelineStepConfigurationHelpDocumentation/>;
      case "azure_acr_push":
        return <AzureAcrPushPipelineStepConfigurationHelpDocumentation/>;
      case "blackduck":
        return <BlackDuckStepConfigurationHelpDocumentation/>;
      case "coverity":
        return <CoverityStepConfigurationHelpDocumentation/>;
      case "child-pipeline":
        return <ChildStepConfigurationHelpDocumentation/>;
      case "docker-push":
        return <DockerEcrPushStepConfigurationHelpDocumentation/>;
      case "external_rest_api_integration":
        return <ExternalApiIntegratorHelpDocumentation/>;
      case "fortify":
        return <FortifyStepConfigurationHelpDocumentation/>;
      case "gitscraper":
        return <GitCustodianStepConfigurationHelpDocumentation/>;
      case "octopus":
        return <OctopusDeployStepConfigurationHelpDocumentation/>;
      case "parallel-processor":
        return <ParallelProcessorStepConfigurationHelpDocumentation/>;
      case "sonar":
        return <SonarQubeStepConfigurationHelpDocumentation/>;
      case "sentinel":
        return <SentinelStepConfigurationHelpDocumentation/>;
      case "servicenow":
        return <ServiceNowHelpDocumentation/>;
      case "snyk":
        return <SnykStepConfigurationHelpDocumentation/>;
      case "twistlock":
        return <TwistlockStepConfigurationHelpDocumentation/>;
      case "terraform":
        return <TerraformStepConfigurationHelpDocumentation/>;
      case "terrascan":
        return <TerrascanStepConfigurationHelpDocumentation/>;
      case "anchore-scan":
      case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
      case "aws-deploy":
      case "azure-functions":
      case "command-line":
      case "conditional-operator":
      case "cypress":
      case "databricks-notebook":
      case "dotnet":
      case "dotnet-cli":
      case "elastic-beanstalk":
      case "gcp-deploy":
      case "jenkins":
      case "jfrog_artifactory_docker":
      case "jfrog_artifactory_maven":
      case "junit":
      case "jmeter":
      case "kafka_connect":
      case "mock-step":
      case "mongodb_realm":
      case "nexus":
      case "npm":
      case "nunit":
      case "powershell":
      case "selenium":
      case "s3":
      case "ssh-upload":
      case "spinnaker":
      case "sfdc-configurator":
      case "teamcity":
      case toolIdentifierConstants.TOOL_IDENTIFIERS.TERRAFORM_VCS:
      case "xunit":
      default:
        return null;
    }

  };

  const getHelpComponent = () => {
    if (type === "notification") {
      return null;
    }

    if (type === "step") {
      return <PipelineStepSetupHelpDocumentation/>;
    }

    return (getToolHelpPanel());
  };

  return (
    <LaunchHelpIcon
      iconClassName={iconClassName}
      className={className}
      helpComponent={getHelpComponent()}
    />
  );
}

StepToolHelpIcon.propTypes = {
  type: PropTypes.string,
  tool: PropTypes.string,
  className: PropTypes.string,
  iconClassName: PropTypes.string
};

StepToolHelpIcon.defaultProps = {
  className: "mr-2 my-auto"
};

export default StepToolHelpIcon;
