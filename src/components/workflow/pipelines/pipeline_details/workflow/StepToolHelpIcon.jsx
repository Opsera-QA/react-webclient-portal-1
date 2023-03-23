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

function StepToolHelpIcon({type, tool, className, iconClassName}) {
  // TODO: Alphabetize when adding new help panels
  const getToolHelpPanel = () => {
    switch (tool) {
      case "azure-devops":
        return <AzureDevopsPipelineStepConfigurationHelpDocumentation/>;
      case "docker-push":
        return <DockerEcrPushStepConfigurationHelpDocumentation/>;
      case "aws_ecs_deploy":
        return <AwsEcsDeployStepConfigurationHelpDocumentation/>;
      case "azure_aks_deploy":
        return <AzureAksDeployPipelineStepConfigurationHelpDocumentation/>;
      case "azure_acr_push":
        return <AzureAcrPushPipelineStepConfigurationHelpDocumentation/>;
      case "octopus":
        return <OctopusDeployStepConfigurationHelpDocumentation/>;
      case "ansible":
        return <AnsibleStepConfigurationHelpDocumentation/>;
      case "approval":
        return <ApprovalGateStepConfigurationHelpDocumentation/>;
      case "external_rest_api_integration":
        return <ExternalApiIntegratorHelpDocumentation/>;
      case "jenkins":
      case "junit":
      case "xunit":
      case "sonar":
        return <SonarQubeStepConfigurationHelpDocumentation/>;
      case "command-line":
      case "npm":
      case "teamcity":
      case "jmeter":
      case "selenium":
      case "twistlock":
        return <TwistlockStepConfigurationHelpDocumentation/>;
      case "aws-deploy":
      case "gcp-deploy":
      case "s3":
      case "databricks-notebook":
      case "ssh-upload":
      case "spinnaker":
      case "servicenow":
        return <ServiceNowHelpDocumentation/>;
      case "cypress":
      case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
      case "anchore-scan":
      case "anchore-integrator":
      case "sfdc-configurator":
      case "nexus":
      case "terraform":
      case toolIdentifierConstants.TOOL_IDENTIFIERS.TERRAFORM_VCS:
      case "elastic-beanstalk":
      case "child-pipeline":
        return <ChildStepConfigurationHelpDocumentation/>;
      case "mock-step":
      case "parallel-processor":
        return <ParallelProcessorStepConfigurationHelpDocumentation/>;
      case "conditional-operator":
      case "powershell":
      case "dotnet":
      case "dotnet-cli":
      case "nunit":
      case "jfrog_artifactory_docker":
      case "terrascan":
      case "kafka_connect":
      case "aws_lambda":
      case "coverity":
      case "jfrog_artifactory_maven":
      case "azure-functions":
      case "mongodb_realm":
      case toolIdentifierConstants.TOOL_IDENTIFIERS.AQUASEC:
        return <AquaSecStepConfigurationHelpDocumentation/>;
      case "gitscraper":
        return <GitCustodianStepConfigurationHelpDocumentation/>;
      case "fortify":
        return <FortifyStepConfigurationHelpDocumentation/>;
      case "blackduck":
        return <BlackDuckStepConfigurationHelpDocumentation/>;
      case "snyk":
        return <SnykStepConfigurationHelpDocumentation/>;
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
