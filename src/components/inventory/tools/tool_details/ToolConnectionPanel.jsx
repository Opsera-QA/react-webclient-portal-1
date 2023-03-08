import React from "react";
import PropTypes from "prop-types";
import SfdcToolConfiguration from "components/inventory/tools/tool_details/tool_jobs/sfdc/SfdcToolConfiguration";
import ArgoToolConfiguration from "./tool_jobs/argo/ArgoToolConfiguration";
import JenkinsToolConfiguration from "./tool_jobs/jenkins/JenkinsToolConfiguration";
import NexusToolConfiguration from "./tool_jobs/nexus/NexusToolConfiguration";
import JiraToolConfiguration from "./tool_jobs/jira/JiraToolConfiguration";
import TeamsToolConfiguration from "./tool_jobs/teams/TeamsToolConfiguration";
import OctopusToolConfiguration from "./tool_jobs/octopus/OctopusToolConfiguration";
import SlackToolConfiguration from "./tool_jobs/slack/SlackToolConfiguration";
import SonarToolConfiguration from "./tool_jobs/sonar/SonarToolConfiguration";
import SpinnakerToolConfiguration from "./tool_jobs/spinnaker/SpinnakerToolConfiguration";
import BitbucketToolConfiguration from "./tool_jobs/bitbucket/BitbucketToolConfiguration";
import AnchoreScanToolConfiguration from "./tool_jobs/anchore_scan/AnchoreScanToolConfiguration";
import GithubToolConfiguration from "./tool_jobs/github/GithubToolConfiguration";
import AnchoreIntegratorToolConfiguration
  from "components/inventory/tools/tool_details/tool_jobs/anchore_integrator/AnchoreIntegratorToolConfiguration";
import AwsToolConfiguration from "./tool_jobs/aws/AwsToolConfiguration";
import CypressToolConfiguration from "./tool_jobs/cypress/CypressToolConfiguration";
import GitlabToolConfiguration from "components/inventory/tools/tool_details/tool_jobs/gitlab/GitlabToolConfiguration";
import AzureToolConfiguration from "./tool_jobs/azure/AzureToolConfiguration";
import JFrogToolConfiguration from "./tool_jobs/jfrog_artifactory/JFrogToolConfiguration";
import ServiceNowToolConfiguration from  "./tool_jobs/service_now/ServiceNowToolConfiguration";
import AzureDevopsToolConfiguration from "./tool_jobs/azure-devops/AzureDevopsToolConfiguration";
import HashicorpVaultToolConfiguration from "./tool_jobs/hashicorp_vault/HashicorpVaultToolConfiguration";
import KafkaConnectToolConfiguration from "./tool_jobs/kafka_connect/KafkaConnectToolConfiguration";
import CoverityToolConfiguration from "./tool_jobs/coverity/CoverityToolConfiguration";
import TwistlockToolConfiguration from "./tool_jobs/twistlock/TwistlockToolConfiguration";
import AzureV2ToolConfiguration from "./tool_jobs/azureV2/AzureV2ToolConfiguration";
import AnsibleToolConfiguration from "./tool_jobs/ansible/AnsibleToolConfiguration";
import MongodbRealmToolConfiguration from "./tool_jobs/mongodb_realm/MongodbRealmToolConfiguration";
import InformaticaToolConfiguration from "./tool_jobs/informatica/InformaticaToolConfiguration";
import TerraformCloudToolConfiguration from "./tool_jobs/terraform_cloud/TerraformCloudToolConfiguration";
import GcpToolConfiguration from "./tool_jobs/gcp/GcpToolConfiguration";
import BuildkiteToolConfiguration from "./tool_jobs/buildkite/BuildkiteToolConfiguration";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import FlywayDatabaseToolConnectionEditorPanel
  from "components/inventory/tools/details/identifiers/flyway_database/FlywayDatabaseToolConnectionEditorPanel";
import GithubDeploykeysToolConfigurationPanel from "components/inventory/tools/tool_details/tool_jobs/github_deploykeys/GithubDeploykeysToolConfigurationPanel";
import ApigeeToolConnectionEditorPanel
  from "components/inventory/tools/details/identifiers/apigee/ApigeeToolConnectionEditorPanel";
import SnaplogicToolConfiguration
  from "components/inventory/tools/tool_details/tool_jobs/snaplogic/SnaplogicToolConfiguration";
import SapCpqToolConfiguration from "./tool_jobs/sap/SapCpqToolConfiguration";
import BoomiToolConfiguration from "./tool_jobs/boomi/BoomiToolConfiguration";
import InformaticaIdqToolConfiguration from "./tool_jobs/informatica_idq/InformaticaIdqToolConfiguration";
import LiquibaseToolConfiguration from "./tool_jobs/liquibase/LiquibaseToolConfiguration";
import BlackduckToolConfiguration from "components/inventory/tools/tool_details/tool_jobs/black_duck/BlackduckToolConfiguration";
import GChatToolConfiguration from "./tool_jobs/gchat/GChatToolConfiguration";
import FortifyToolConfiguration from "./tool_jobs/fortify/FortifyToolConfiguration";
import SnykToolConfiguration from "./tool_jobs/snyk/SnykToolConfiguration";
import AquasecToolConfiguration from "./tool_jobs/aquasec/AquasecToolConfiguration";

//TODO: Use constants, alphabetize
export const CONNECTION_SUPPORTED_TOOL_IDENTIFIERS = [
  toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_API_INTEGRATOR,
  "jenkins",
  "jira",
  "github",
  "gitlab",
  "bitbucket",
  "spinnaker",
  "cypress",
  toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO,
  "anchore-scan",
  "anchore-integrator",
  "sonar",
  "aws_account",
  toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR,
  "nexus",
  "teams",
  "octopus",
  "slack",
  "azure_account",
  "jfrog_artifactory_maven",
  "jfrog_artifactory_docker",
  "servicenow",
  "azure-devops",
  "hashicorp_vault",
  "kafka_connect",
  "coverity",
  "twistlock",
  "azure",
  "ansible",
  "mongodb_realm",
  toolIdentifierConstants.TOOL_IDENTIFIERS.FLYWAY_DATABASE_MIGRATOR,
  "informatica",
  "terraform-cloud",
  "buildkite",
  "gcp_account",
  toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB_DEPLOY_KEY,
  toolIdentifierConstants.TOOL_IDENTIFIERS.APIGEE,
  toolIdentifierConstants.TOOL_IDENTIFIERS.SNAPLOGIC,
  toolIdentifierConstants.TOOL_IDENTIFIERS.SAP_CPQ,
  toolIdentifierConstants.TOOL_IDENTIFIERS.BOOMI,
  "informatica-idq",
  toolIdentifierConstants.TOOL_IDENTIFIERS.LIQUIBASE,
  toolIdentifierConstants.TOOL_IDENTIFIERS.GCHAT,
  toolIdentifierConstants.TOOL_IDENTIFIERS.BLACKDUCK,
  toolIdentifierConstants.TOOL_IDENTIFIERS.FORTIFY,
  toolIdentifierConstants.TOOL_IDENTIFIERS.SNYK,
  toolIdentifierConstants.TOOL_IDENTIFIERS.AQUASEC,
];

function ToolConnectionPanel({ toolData, setToolData, setUpMode, setCurrentScreen, setButtonContainer, handleClose }) {
  const getConnectionPanel = () => {
    if (toolData == null) {
      return <></>;
    }

    //TODO: Use constants, alphabetize
    switch (toolData?.getData("tool_identifier")) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_API_INTEGRATOR:
        return (
          <div className={"text-center p-5 text-muted mt-5"}>
            Connection configuration is handled using Endpoints. For an API
            Integration Pipeline Step, please create an endpoint to validate status
            and configure it on the pipeline step.
          </div>
        );
      case "jenkins":
        return <JenkinsToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "jira":
        return <JiraToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "github":
        return <GithubToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "gitlab":
        return <GitlabToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "bitbucket":
        return <BitbucketToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "spinnaker":
        return <SpinnakerToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "cypress":
        return <CypressToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
        return <ArgoToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "anchore-scan":
        return <AnchoreScanToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "anchore-integrator":
        return <AnchoreIntegratorToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "sonar":
        return <SonarToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "aws_account":
        return <AwsToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR:
        return <SfdcToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "nexus":
        return <NexusToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "teams":
        return <TeamsToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "octopus":
        return <OctopusToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "slack":
        return <SlackToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen} setButtonContainer={setButtonContainer} handleClose={handleClose}/>;
      case "azure_account":
        return <AzureToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "jfrog_artifactory_maven":
      case "jfrog_artifactory_docker":
        return <JFrogToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "servicenow":
        return <ServiceNowToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/> ;
      case "azure-devops":
        return <AzureDevopsToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "hashicorp_vault":
        return <HashicorpVaultToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "kafka_connect":
        return <KafkaConnectToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "coverity":
        return <CoverityToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "twistlock":
        return <TwistlockToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "azure":
        return <AzureV2ToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "ansible":
        return <AnsibleToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "mongodb_realm":        
        return <MongodbRealmToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.FLYWAY_DATABASE_MIGRATOR:
        return <FlywayDatabaseToolConnectionEditorPanel toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "informatica":
        return <InformaticaToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "terraform-cloud":
        return <TerraformCloudToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "buildkite":
        return <BuildkiteToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "gcp_account":
        return <GcpToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB_DEPLOY_KEY:
        return <GithubDeploykeysToolConfigurationPanel toolData={toolData} />;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.APIGEE:
        return <ApigeeToolConnectionEditorPanel toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SNAPLOGIC:
        return <SnaplogicToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SAP_CPQ:
        return <SapCpqToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.BOOMI:
        return <BoomiToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case "informatica-idq":
        return <InformaticaIdqToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.LIQUIBASE:
        return <LiquibaseToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.BLACKDUCK:
        return <BlackduckToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GCHAT:
        return <GChatToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.FORTIFY:
        return <FortifyToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SNYK:
        return <SnykToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      case toolIdentifierConstants.TOOL_IDENTIFIERS.AQUASEC:
        return <AquasecToolConfiguration toolData={toolData} setUpMode={setUpMode} setCurrentScreen={setCurrentScreen}/>;
      default:
        return <div className="text-center p-5 text-muted mt-5">Connection configuration is not currently available for this tool.</div>;
    }
  };
  
  return (
    <div className="p-3">
      {getConnectionPanel() }
    </div>
  );
}

ToolConnectionPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  handleClose: PropTypes.func,
};


export default ToolConnectionPanel;
