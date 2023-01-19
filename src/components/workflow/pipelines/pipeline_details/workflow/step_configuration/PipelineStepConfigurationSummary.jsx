import React from "react";
import PropTypes from "prop-types";
import AnchoreIntegratorStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/anchore_integrator/AnchoreIntegratorStepConfigurationSummaryPanel";
import anchoreIntegratorStepConfigurationMetadata
  from "./step_tool_configuration_forms/anchore_integrator/anchore-integrator-step-configuration-metadata";
import Model from "../../../../../../core/data_model/model";
import ReactJson from "react-json-view";
import ChildPipelineStepConfigurationSummaryPanel
  from "../../../../plan/step/child/ChildPipelineStepConfigurationSummaryPanel";
import {childPipelineStepMetadata}
  from "components/workflow/plan/step/child/childPipelineStep.metadata";
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
  from "../../../../plan/step/spinnaker/SpinnakerPipelineStepConfigurationSummaryPanel";
import spinnakerStepFormMetadata from "../../../../plan/step/spinnaker/spinnaker-stepForm-metadata";
import ArgoCdPipelineStepConfigurationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/ArgoCdPipelineStepConfigurationSummaryPanel";
import {ArgoCdStepConfigurationMetadata} from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/argoCdStepConfiguration.metadata";
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
import TerraformVcsStepConfigurationSummaryPanel from "./step_tool_configuration_forms/terraform_vcs/TerraformVcsStepConfigurationSummaryPanel";
import TerraformVcsStepFormMetadata from "./step_tool_configuration_forms/terraform_vcs/terraform-vcs-stepForm-metadata";
import ParallelProcessPipelineStepConfigurationSummaryPanel
  from "components/workflow/plan/step/parallel_processor/ParallelProcessPipelineStepConfigurationSummaryPanel";
import {parallelProcessorStepMetadata}
  from "components/workflow/plan/step/parallel_processor/parallelProcessorStep.metadata";
import NpmPipelineStepConfigurationSummaryPanel
  from "../../../../plan/step/npm/NpmPipelineStepConfigurationSummaryPanel";
import {npmStepMetadata} from "components/workflow/plan/step/npm/npmStep.metadata";
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
import JmeterPipelineStepConfigurationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jmeter/JmeterPipelineStepConfigurationSummaryPanel";
import jmeterPipelineStepConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jmeter/jmeterPipelineStepConfigurationMetadata";
import SeleniumPipelineStepConfigurationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/selenium/SeleniumPipelineStepConfigurationSummaryPanel";
import seleniumPipelineStepConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/selenium/seleniumPipelineStepConfigurationMetadata";
import TwistlockPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/twistlock/TwistlockPipelineStepConfigurationSummaryPanel";
import twistlockPipelineStepFormMetadata from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/twistlock/twistlockPipelineStepForm.metadata";
import S3PipelineStepConfigurationSummaryPanel
  from "components/workflow/plan/step/s3/S3PipelineStepConfigurationSummaryPanel";
import SshUploadDeployPipelineStepConfigurationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/ssh_upload_deploy/SshUploadDeployPipelineStepConfigurationSummaryPanel";
import sshUploadDeployPipelineStepConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/ssh_upload_deploy/sshUploadDeployPipelineStepConfigurationMetadata";
import CypressPipelineStepConfigurationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/CypressPipelineStepConfigurationSummaryPanel";
import cypressPipelineStepConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/cypressPipelineStepConfigurationMetadata";
import DockerPushPipelineStepConfigurationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_push/DockerPushPipelineStepConfigurationSummaryPanel";
import dockerPushStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_push/dockerpush-stepForm-metadata";
import SfdcPipelineStepConfigurationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/SfdcPipelineStepConfigurationSummaryPanel";
import sfdcPipelineStepConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/sfdcPipelineStepConfigurationMetadata";
import DotNetPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/dotnet/DotNetPipelineStepConfigurationSummaryPanel";
import DotNetCliPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/dotnetcli/DotNetCliPipelineStepConfigurationSummaryPanel";
import dotnetStepFormMetadata from "./step_tool_configuration_forms/dotnet/dotnet-stepForm-metadata";
import dotnetCliStepFormMetadata from "./step_tool_configuration_forms/dotnetcli/dotnet-cli-stepForm-metadata";
import NUnitPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/nunit/NUnitPipelineStepConfigurationSummaryPanel";
import nunitStepFormMetadata from "./step_tool_configuration_forms/nunit/nunit-stepForm-metadata";
import JFrogDockerPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/jfrog_artifactory_docker/JFrogDockerPipelineStepConfigurationSummaryPanel";
import jfrogStepFormMetadata from "./step_tool_configuration_forms/jfrog_artifactory_docker/jfrog-stepForm-metadata";
import TerrascanPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/terrascan/TerrascanPipelineStepConfigurationSummaryPanel";
import terrascanStepFormMetadata from "./step_tool_configuration_forms/terrascan/terrascan-stepForm-metadata";
import AzureDevopsPipelineStepConfigurationSummary
  from "./step_tool_configuration_forms/azure_devops/AzureDevopsPipelineStepConfigurationSummary";
import azureDevopsStepFormMetadata from "./step_tool_configuration_forms/azure_devops/azureDevops-stepForm-metadata";
import AzureAcrPushPipelineStepConfigurationSummary
  from "./step_tool_configuration_forms/azure_acr_push/AzureAcrPushPipelineStepConfigurationSummary";
import azureAcrPushStepFormMetadata from "./step_tool_configuration_forms/azure_acr_push/azureAcrPush-stepForm-metadata";
import KafkaConnectPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/kafka_connect/KafkaConnectPipelineStepConfigurationSummaryPanel";
import kafkaConnectStepFormMetadata from "./step_tool_configuration_forms/kafka_connect/kafkaConnect-stepForm-metadata";
import AwsEcsDeployPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/aws_ecs_deploy/AwsEcsSDeployPipelineStepConfigurationSummary";
import awsECSDeployStepFormMetadata
  from "./step_tool_configuration_forms/aws_ecs_deploy/awsECSDeploy-stepForm-metadata";
import coverityStepFormMetadata from "./step_tool_configuration_forms/coverity/coverity-stepForm-metadata";
import CoverityPipelineStepConfigurationSummaryPanel from "./step_tool_configuration_forms/coverity/CoverityPipelineStepConfigurationSummaryPanel";
import AksServiceDeployStepSummary
  from "./step_tool_configuration_forms/aks_service_deploy/AksServiceDeployStepSummary";
import aksStepFormMetadata from "./step_tool_configuration_forms/aks_service_deploy/aks-stepForm-metadata";
import AwsLambdaPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/aws_lambda_publish/AwsLambdaPipelineStepConfigurationSummary";
import {s3PipelineStepConfigurationMetadata} from "components/workflow/plan/step/s3/s3PipelineStepConfiguration.metadata";
import awsLambdaStepFormMetadata from "./step_tool_configuration_forms/aws_lambda_publish/awsLambda-stepForm-metadata";
import mongodbRealmStepFormMetadata from "./step_tool_configuration_forms/mongodb_realm/mongodb-realm-stepForm-metadata";
import MongodbRealmStepConfigurationSummaryPanel from "./step_tool_configuration_forms/mongodb_realm/MongodbRealmStepConfigurationSummaryPanel";
import AzureFunctionsStepConfigurationSummaryPanel from "./step_tool_configuration_forms/azure_functions/AzureFunctionsStepConfigurationSummaryPanel";
import azureFunctionsStepFormMetadata from "./step_tool_configuration_forms/azure_functions/azureFunctions-stepForm-metadata";
import FlywayDatabasePipelineStepConfigurationSummaryPanel from "./step_tool_configuration_forms/flyway_database/FlywayDatabasePipelineStepConfigurationSummaryPanel";
import flywayDatabaseStepFormMetadata from "./step_tool_configuration_forms/flyway_database/flyway-database-stepForm-metadata";
import InformaticaPipelineStepConfigurationSummaryPanel from "./step_tool_configuration_forms/informatica/InformaticaPipelineStepConfigurationSummaryPanel";
import InformaticaStepFormMetadata from "./step_tool_configuration_forms/informatica/informatica-stepForm-metadata";
import PmdScanPipelineStepConfigurationSummaryPanel from "./step_tool_configuration_forms/pmd_scan/PmdScanPipelineStepConfigurationSummaryPanel";
import pmdScanStepFormMetadata from "./step_tool_configuration_forms/pmd_scan/pmdScan-stepForm-metadata";
import sonarPipelineStepMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sonar/sonarPipelineStep.metadata";
import SentinelStepConfigurationSummaryPanel from "./step_tool_configuration_forms/sentenial/SentinelStepConfigurationSummaryPanel";
import SentenialStepFormMetadata from "./step_tool_configuration_forms/sentenial/sentinel-stepForm-metadata";
import BuildkiteStepSummary from "./step_tool_configuration_forms/buildkite/BuildkiteStepSummary";
import buildkiteMetadata from "./step_tool_configuration_forms/buildkite/buildkite-metadata";
import PackerPipelineStepConfigurationSummaryPanel from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/packer/PackerPipelineStepConfigurationSummaryPanel";
import PackerStepFormMetadata from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/packer/packer-stepForm-metadata";
import AzureScriptsStepSummaryPanel from "components/workflow/plan/step/azure_scripts/AzureScriptsStepSummaryPanel";
import {azureScriptsStepMetadata} from "components/workflow/plan/step/azure_scripts/azureScriptsStep.metadata";
import GitScraperSummaryPanel from "./step_tool_configuration_forms/gitscraper/GitScraperSummaryPanel";
import GitScraperStepFormMetadata from "./step_tool_configuration_forms/gitscraper/gitscraper-step-metadata";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import ExternalRestApiIntegrationStepSummaryPanel
  from "components/workflow/plan/step/external_rest_api_integration/step_summary/ExternalRestApiIntegrationStepSummaryPanel";
import {
  externalRestApiIntegrationStepMetadata
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.metadata";
import SalesforceScanPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/salesforce_scan/SalesforceScanPipelineStepConfigurationSummaryPanel";
import salesforceScanStepFormMetadata
  from "./step_tool_configuration_forms/salesforce_scan/salesforceScan-stepForm-metadata";
import GitOperationPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/git_operation/GitOperationPipelineStepConfigurationSummaryPanel";
import gitOperationStepFormMetadata from "./step_tool_configuration_forms/git_operation/gitOperation-stepForm-metadata";
import ApigeePipelineStepConfigurationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/apigee/ApigeePipelineStepConfigurationSummaryPanel";
import ApigeeStepFormMetadata from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/apigee/apigee-stepForm-metadata";
import SnaplogicPipelineStepConfigurationSummary
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/snaplogic/SnaplogicPipelineStepConfigurationSummary";
import SnaplogicStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/snaplogic/snaplogic-stepForm-metadata";
import SapCpqPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/sap_cpq/SapCpqPipelineStepConfigurationSummaryPanel";
import sapCpqStepFormMetadata from "./step_tool_configuration_forms/sap_cpq/sap-cpq-stepForm-metadata";
import ProvarStepConfigSummary from "./step_tool_configuration_forms/provar/ProvarStepConfigSummary";
import provarStepFormMetadata from "./step_tool_configuration_forms/provar/provar-step-config";
import AzureWebappsStepConfigurationSummaryPanel from "./step_tool_configuration_forms/azure_webapps/AzureWebappsStepConfigurationSummaryPanel";
import azureWebappsStepFormMetadata from "./step_tool_configuration_forms/azure_webapps/azureWebapps-stepForm-metadata";
import AzureCliStepConfigurationSummaryPanel from "./step_tool_configuration_forms/azure_cli/AzureCliStepConfigurationSummaryPanel";
import azureCliStepFormMetadata from "./step_tool_configuration_forms/azure_cli/azureCli-stepForm-metadata";
import BoomiStepConfigurationSummary from "./step_tool_configuration_forms/boomi/BoomiStepConfigurationSummary";
import boomiMetadata from "./step_tool_configuration_forms/boomi/boomi.metadata";
import InformaticaIdqConnectionMetadata
  from "../../../../../inventory/tools/tool_details/tool_jobs/informatica_idq/informatica-idq-connection-metadata";
import InformaticaIdqPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/informatica_idq/InformaticaIdqPipelineStepConfigurationSummaryPanel";
import LiquibasePipelineStepConfigurationSummary
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/liquibase/LiquibasePipelineStepConfigurationSummary";
import LiquibaseStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/liquibase/liquibase-stepForm-metadata";
import BlackDuckPipelineStepConfigurationSummary
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/black_duck/BlackDuckPipelineStepConfigurationSummary";
import BlackDuckStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/black_duck/blackduck-stepForm-metadata";
import FortifyPipelineStepConfigurationSummary
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/fortify/FortifyPipelineStepConfigurationSummary";
import FortifyStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/fortify/fortify-stepForm-metadata";
import DockerCliPipelineStepConfigurationSummary
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_cli/DockerCliPipelineStepConfigurationSummary";
import dockerCliStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_cli/dockercli-stepForm-metadata";
import UserActionsPipelineStepSummaryPanel
  from "components/workflow/plan/step/user_actions/UserActionsPipelineStepSummaryPanel";
import {
  userActionsPipelineStepMetadata
} from "components/workflow/plan/step/user_actions/userActionsPipelineStep.metadata";
import JFrogMavenPipelineStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/jfrog_artifactory_maven/JFrogMavenPipelineStepConfigurationSummaryPanel";
import jfrogMavenStepFormMetadata
  from "./step_tool_configuration_forms/jfrog_artifactory_maven/jfrog-maven-stepForm-metadata";
import AnsibleStepConfigurationSummaryPanel
  from "./step_tool_configuration_forms/ansible/AnsibleStepConfigurationSummaryPanel";
import ansibleStepMetadata from "./step_tool_configuration_forms/ansible/ansible.step.metadata";
import azureZipDeploymentMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_zip_deployment/azureZipDeployment.metadata";
import AzureZipDeploymentStepConfigurationSummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_zip_deployment/AzureZipDeploymentStepConfigurationSummaryPanel";
import SnykPipelineStepConfigurationSummary from "./step_tool_configuration_forms/snyk/inputs/SnykPipelineStepConfigurationSummary";
import snykStepFormMetadata from "./step_tool_configuration_forms/snyk/snyk-stepForm-metadata";

function PipelineStepConfigurationSummary({
  pipelineData,
}) {
  const getModelWrappedObject = (metaData) => {
    return (new Model({...pipelineData?.tool?.configuration}, metaData, false));
  };

  // TODO: Pass in already wrapped data object?
  const getStepConfigurationSummary = () => {
    switch (pipelineData?.tool?.tool_identifier) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_REST_API_INTEGRATION:
        return (
          <ExternalRestApiIntegrationStepSummaryPanel
            pipelineData={pipelineData}
            externalRestApiIntegrationModel={getModelWrappedObject(externalRestApiIntegrationStepMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_SCRIPTS:
        return (
          <AzureScriptsStepSummaryPanel
            pipelineData={pipelineData}
            azureScriptsStepModel={getModelWrappedObject(azureScriptsStepMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION:
        return (
          <UserActionsPipelineStepSummaryPanel
            pipelineModel={pipelineData}
            userActionsPipelineStepModel={getModelWrappedObject(userActionsPipelineStepMetadata)}
          />
        );
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
      case toolIdentifierConstants.TOOL_IDENTIFIERS.ANSIBLE:
        return (
          <AnsibleStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            ansibleDataObject={getModelWrappedObject(ansibleStepMetadata)}
          />
        );
      case "approval":
        return (
          <ApprovalGatePipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            approvalGatePipelineDataObject={getModelWrappedObject(approvalGatePipelineStepConfigurationMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
        return (
          <ArgoCdPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            argoCdPipelineDataObject={getModelWrappedObject(ArgoCdStepConfigurationMetadata)}
          />
        );
      case "aws-deploy":
        return (
          <AwsDeployPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            awsDeployPipelineDataObject={getModelWrappedObject(awsDeployPipelineStepConfigurationMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.CHILD_PIPELINE:
        return (
          <ChildPipelineStepConfigurationSummaryPanel
            pipelineModel={pipelineData}
            childPipelineModel={getModelWrappedObject(childPipelineStepMetadata)}
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
            npmPipelineDataObject={getModelWrappedObject(npmStepMetadata)}
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
            parallelPipelineDataObject={getModelWrappedObject(parallelProcessorStepMetadata)}
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
      case toolIdentifierConstants.TOOL_IDENTIFIERS.TERRAFORM_VCS:
        return (
          <TerraformVcsStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            terraformVcsStepModel={getModelWrappedObject(TerraformVcsStepFormMetadata)}
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
      case "dotnet":
        return (
          <DotNetPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            dotNetPipelineDataObject={getModelWrappedObject(dotnetStepFormMetadata)}
          />
        );
      case "dotnet-cli":
        return (
          <DotNetCliPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            dotNetCliPipelineDataObject={getModelWrappedObject(dotnetCliStepFormMetadata)}
          />
        );
      case "nunit":
        return (
          <NUnitPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            nunitPipelineDataObject={getModelWrappedObject(nunitStepFormMetadata)}
          />
        );
      case "sonar":
        return (
          <SonarPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            sonarDataObject={getModelWrappedObject(sonarPipelineStepMetadata)}
          />
        );
      case "jmeter":
        return (
          <JmeterPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            jmeterDataObject={getModelWrappedObject(jmeterPipelineStepConfigurationMetadata)}
          />
        );
      case "selenium":
        return (
          <SeleniumPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            seleniumDataObject={getModelWrappedObject(seleniumPipelineStepConfigurationMetadata)}
          />
        );
      case "twistlock":
        return (
          <TwistlockPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            twistlockPipelineDataObject={getModelWrappedObject(twistlockPipelineStepFormMetadata)}
          />
        );
      case "s3":
        return (
          <S3PipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            s3DataObject={getModelWrappedObject(s3PipelineStepConfigurationMetadata)}
          />
        );
      case "ssh-upload":
        return (
          <SshUploadDeployPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            sshUploadDeployDataObject={getModelWrappedObject(sshUploadDeployPipelineStepConfigurationMetadata)}
          />
        );
      case "cypress":
        return (
          <CypressPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            cypressDataObject={getModelWrappedObject(cypressPipelineStepConfigurationMetadata)}
          />
        );
      case "docker-push":
        return (
          <DockerPushPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            dockerPushDataObject={getModelWrappedObject(dockerPushStepFormMetadata)}
          />
        );
      case "sfdc-configurator":
        return (
          <SfdcPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            sfdcDataObject={getModelWrappedObject(sfdcPipelineStepConfigurationMetadata)}
          />
        );
      case "jfrog_artifactory_docker":
        return (
          <JFrogDockerPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            jFrogPipelineDataObject={getModelWrappedObject(jfrogStepFormMetadata)}
          />
        );
      case "jfrog_artifactory_maven":
        return (
          <JFrogMavenPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            jFrogPipelineDataObject={getModelWrappedObject(jfrogMavenStepFormMetadata)}
          />
        );
      case "terrascan":
        return (
          <TerrascanPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            terrascanLinePipelineDataObject={getModelWrappedObject(terrascanStepFormMetadata)}
          />
        );
      case "azure-devops":
        return (
          <AzureDevopsPipelineStepConfigurationSummary
            pipelineData={pipelineData}
            azureDevopsPipelineDataObject={getModelWrappedObject(azureDevopsStepFormMetadata)}
          />
        );
      case "azure_acr_push":
        return (
          <AzureAcrPushPipelineStepConfigurationSummary
            pipelineData={pipelineData}
            azureAcrPushPipelineDataObject={getModelWrappedObject(azureAcrPushStepFormMetadata)}
          />
        );
      case "azure_zip-deployment":
        return (
          <AzureZipDeploymentStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            azureFunctionsPipelineDataObject={getModelWrappedObject(azureZipDeploymentMetadata)}
          />
        );
      case "kafka_connect":
        return (
          <KafkaConnectPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            kafkaConnectPipelineDataObject={getModelWrappedObject(kafkaConnectStepFormMetadata)}
          />
        );
      case "aws_ecs_deploy":
        return (
          <AwsEcsDeployPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            awsECSDeployPipelineDataObject={getModelWrappedObject(awsECSDeployStepFormMetadata)}
          />
        );
      case "coverity":
          return (
            <CoverityPipelineStepConfigurationSummaryPanel
              pipelineData={pipelineData}
              coverityPipelineDataObject={getModelWrappedObject(coverityStepFormMetadata)}
            />
          );
      case "aws_lambda":
        return (
          <AwsLambdaPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            awsECSDeployPipelineDataObject={getModelWrappedObject(awsLambdaStepFormMetadata)}
          />
        );
      case "mongodb_realm":
        return (
          <MongodbRealmStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            mongodbRealmPipelineDataObject={getModelWrappedObject(mongodbRealmStepFormMetadata)}
          />
        );
      case "azure_aks_deploy":
        return (
          <AksServiceDeployStepSummary
            pipelineData={pipelineData}
            aksDeployPipelineDataObject={getModelWrappedObject(aksStepFormMetadata)}
            />
        );
      case "azure-functions":
        return (
          <AzureFunctionsStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            azureFunctionsPipelineDataObject={getModelWrappedObject(azureFunctionsStepFormMetadata)}
            />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.FLYWAY_DATABASE_MIGRATOR:
        return (
          <FlywayDatabasePipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            flywayPipelineDataObject={getModelWrappedObject(flywayDatabaseStepFormMetadata)}
          />
        );
      case "informatica":
        return (
          <InformaticaPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            informaticaPipelineDataObject={getModelWrappedObject(InformaticaStepFormMetadata)}
          />
        );
      case "pmd":
        return (
          <PmdScanPipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            pmdScanPipelineDataObject={getModelWrappedObject(pmdScanStepFormMetadata)}
          />
        );
      case "sentinel":
        return (
          <SentinelStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            sentenialStepFormMetadata={getModelWrappedObject(SentenialStepFormMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.PACKER:
        return (
          <PackerPipelineStepConfigurationSummaryPanel
            packerStepModel={getModelWrappedObject(PackerStepFormMetadata)}
            pipelineData={pipelineData}
          />
        );
      case "buildkite":
        return (
          <BuildkiteStepSummary
            pipelineData={pipelineData}
            buildkiteStepConfigurationData={getModelWrappedObject(buildkiteMetadata)}
          />
        );
      case "gitscraper":
        return (
          <GitScraperSummaryPanel
            pipelineData={pipelineData}
            gitScraperPipelineDataObject={getModelWrappedObject(GitScraperStepFormMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SALESFORCE_CODE_ANALYZER:
        return (
            <SalesforceScanPipelineStepConfigurationSummaryPanel
                pipelineData={pipelineData}
                salesforceScanPipelineDataObject={getModelWrappedObject(salesforceScanStepFormMetadata)}
            />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GIT_OPERATION:
        return (
            <GitOperationPipelineStepConfigurationSummaryPanel
                pipelineData={pipelineData}
                gitOperationPipelineDataObject={getModelWrappedObject(gitOperationStepFormMetadata)}
            />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.APIGEE:
        return (
          <ApigeePipelineStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            apigeePipelineDataObject={getModelWrappedObject(ApigeeStepFormMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SNAPLOGIC:
        return (
          <SnaplogicPipelineStepConfigurationSummary
            pipelineData={pipelineData}
            snaplogicPipelineDataObject={getModelWrappedObject(SnaplogicStepFormMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SAP_CPQ:
        return (
            <SapCpqPipelineStepConfigurationSummaryPanel
                pipelineData={pipelineData}
                sapCpqPipelineDataObject={getModelWrappedObject(sapCpqStepFormMetadata)}
            />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.PROVAR:
        return (
          <ProvarStepConfigSummary
            pipelineData={pipelineData}
            provarPipelineDataObject={getModelWrappedObject(provarStepFormMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_WEBAPPS:
        return (
          <AzureWebappsStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            azureWebappsPipelineDataObject={getModelWrappedObject(azureWebappsStepFormMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_CLI:
        return (
          <AzureCliStepConfigurationSummaryPanel
            pipelineData={pipelineData}
            azureCliPipelineDataObject={getModelWrappedObject(azureCliStepFormMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.BOOMI:
        return (
            <BoomiStepConfigurationSummary
                pipelineData={pipelineData}
                boomiPipelineDataObject={getModelWrappedObject(boomiMetadata)}
              />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.INFORMATICA_IDQ:
        return (
            <InformaticaIdqPipelineStepConfigurationSummaryPanel
                pipelineData={pipelineData}
                informaticaIdqPipelineDataObject={getModelWrappedObject(InformaticaIdqConnectionMetadata)}
            />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.LIQUIBASE:
        return (
            <LiquibasePipelineStepConfigurationSummary
                pipelineData={pipelineData}
                liquibasePipelineDataObject={getModelWrappedObject(LiquibaseStepFormMetadata)}
            />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.BLACKDUCK:
        return (
          <BlackDuckPipelineStepConfigurationSummary
            pipelineData={pipelineData}
            blackDuckPipelineDataObject={getModelWrappedObject(BlackDuckStepFormMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.FORTIFY:
        return (
            <FortifyPipelineStepConfigurationSummary
                pipelineData={pipelineData}
                fortifyPipelineDataObject={getModelWrappedObject(FortifyStepFormMetadata)}
            />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.DOCKER_CLI:
        return (
            <DockerCliPipelineStepConfigurationSummary
                pipelineData={pipelineData}
                dockerCliPipelineDataObject={getModelWrappedObject(dockerCliStepFormMetadata)}
            />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SNYK:
        return (
            <SnykPipelineStepConfigurationSummary
                pipelineData={pipelineData}
                snykPipelineDataObject={getModelWrappedObject(snykStepFormMetadata)}
            />
        );
      default:
        return (
          <SummaryPanelContainer>
            <ReactJson src={pipelineData?.tool} enableClipboard={false} displayDataTypes={false} collapsed={false}/>
          </SummaryPanelContainer>
        );
    }
  };

  return (
    <div className={"h-100"}>
      {getStepConfigurationSummary()}
    </div>
  );
}

PipelineStepConfigurationSummary.propTypes = {
  pipelineData: PropTypes.object,
};

export default PipelineStepConfigurationSummary;
