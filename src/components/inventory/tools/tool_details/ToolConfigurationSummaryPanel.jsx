import React from "react";
import PropTypes from "prop-types";
import JenkinsToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/jenkins/JenkinsToolConfigurationSummaryPanel";
import modelHelpers from "components/common/model/modelHelpers";
import jenkinsConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/jenkins/jenkins-connection-metadata";
import JiraToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/jira/JiraToolConfigurationSummaryPanel";
import { jiraToolConnectionMetadata } from "components/inventory/tools/tool_details/tool_jobs/jira/jiraToolConnection.metadata";
import GithubToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/github/GithubToolConfigurationSummaryPanel";
import githubConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/github/github-connection-metadata";
import gitlabConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab-connection-metadata";
import GitlabToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/gitlab/GitlabToolConfigurationSummaryPanel";
import BitbucketToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/bitbucket/BitbucketToolConfigurationSummaryPanel";
import bitbucketConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket-connection-metadata";
import SpinnakerToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/spinnaker/SpinnakerToolConfigurationSummaryPanel";
import spinnakerConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/spinnaker/spinnaker-connection-metadata";
import CypressToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/cypress/CypressToolConfigurationSummaryPanel";
import cypressConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/cypress/cypress-connection-metadata";
import ArgoToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/argo/ArgoToolConfigurationSummaryPanel";
import argoConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/argo-connection-metadata";
import AnchoreScanToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/anchore_scan/AnchoreScanToolConfigurationSummaryPanel";
import anchoreScanConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/anchore_scan/anchore-scan-connection-metadata";
import AnchoreIntegratorToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/anchore_integrator/AnchoreIntegratorToolConfigurationSummaryPanel";
import anchoreIntegratorConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/anchore_integrator/anchore-integrator-connection-metadata";
import SonarToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/sonar/SonarToolConfigurationSummaryPanel";
import sonarConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/sonar/sonar-connection-metadata";
import AwsToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/aws/AwsToolConfigurationSummaryPanel";
import awsConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/aws/aws-connection-metadata";
import SfdcToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/sfdc/SfdcToolConfigurationSummaryPanel";
import sfdcConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/sfdc/sfdc-connection-metadata";
import NexusToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/nexus/NexusToolConfigurationSummaryPanel";
import nexusConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/nexus/nexus-connection-metadata";
import teamsConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/teams/teams-connection-metadata";
import TeamsToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/teams/TeamsToolConfigurationSummaryPanel";
import OctopusToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/octopus/OctopusToolConfigurationSummaryPanel";
import octopusConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/octopus/octopus-connection-metadata";
import SlackToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/slack/SlackToolConfigurationSummaryPanel";
import AzureToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/azure/AzureToolConfigurationSummaryPanel";
import AzureConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/azure/azure-connection-metadata";
import AzureDevopsToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/azure-devops/AzureDevopsToolConfigurationSummaryPanel";
import AzureDevopsConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/azure-devops/azureDevops-connection-metadata";
import JFrogToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/JFrogToolConfigurationSummaryPanel";
import jfrogConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/jfrog-connection-metadata";
import ServiceNowToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/service_now/ServiceNowToolConfigurationSummaryPanel";
import serviceNowConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/service_now/service-now-connection-metadata";
import HashicorpVaultToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/hashicorp_vault/HashicorpVaultToolConfigurationSummaryPanel";
import HashicorpVaultConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/hashicorp_vault/hashicorpVault-connection-metadata";
import KafkaConnectToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/kafka_connect/KafkaConnectToolConfigurationSummaryPanel";
import KafkaConnectConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/kafka_connect/kafkaConnect-connection-metadata";
import CoverityToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/coverity/CoverityToolConfigurationSummaryPanel";
import CoverityConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/coverity/coverity-connection-metadata";
import TwistlockToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/twistlock/TwistlockToolConfigurationSummaryPanel";
import TwistlockConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/twistlock/twistlock-connection-metadata";
import mongodbeRealmConnectionMetadata 
from "components/inventory/tools/tool_details/tool_jobs/mongodb_realm/mongodb-realm-connection-metadata";
import MongodbRealmToolConfigurationSummaryPanel 
from "components/inventory/tools/tool_details/tool_jobs/mongodb_realm/MongodbRealmToolConfigurationSummaryPanel";
import InformaticaToolConfigurationSummaryPanel from "components/inventory/tools/tool_details/tool_jobs/informatica/InformaticaToolConfigurationSummaryPanel";
import InformaticaConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/informatica/informatica-connection-metadata";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import FlywayDatabaseToolConnectionSummaryPanel
from "components/inventory/tools/details/identifiers/flyway_database/FlywayDatabaseToolConnectionSummaryPanel";
import {
  flywayDatabaseToolConnectionMetadata
} from "components/inventory/tools/details/identifiers/flyway_database/flywayDatabaseToolConnection.metadata";
import InformaticaIdqConnectionMetadata from "./tool_jobs/informatica_idq/informatica-idq-connection-metadata";
import InformaticaIdqToolConfigurationSummaryPanel
from "./tool_jobs/informatica_idq/InformaticaIdqToolConfigurationSummaryPanel";
import ToolConnectionSummaryContainer
from "components/inventory/tools/details/connection/ToolConnectionSummaryContainer";
import gchatConnectionMetadata
from "components/inventory/tools/tool_details/tool_jobs/gchat/gchat-connection-metadata";
import GChatToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/gchat/GChatToolConfigurationSummaryPanel";
import FortifyToolConfigurationSummaryPanel
from "components/inventory/tools/tool_details/tool_jobs/fortify/FortifyToolConfigurationSummaryPanel";
import FortifyMetadata 
from "components/inventory/tools/tool_details/tool_jobs/fortify/fortify-tool-metadata";
import SnykToolConfigurationSummaryPanel from "./tool_jobs/snyk/SnykToolConfigurationSummaryPanel";
import snykConnectionMetadata from "./tool_jobs/snyk/snyk-connection-metadata";
import AquasecToolConfigurationSummaryPanel from "./tool_jobs/aquasec/AquasecToolConfigurationSummaryPanel";
import AquasecMetadata from "./tool_jobs/aquasec/aquasec-tool-metadata";
import OracleFusionToolConfigurationSummaryPanel from "./tool_jobs/oracle_fusion/OracleFusionToolConfigurationSummaryPanel";
import OracleFusionMetadata from "./tool_jobs/oracle_fusion/oracleFusion-tool-metadata";

function ToolConfigurationSummaryPanel({ toolConfiguration, toolIdentifier }) {
  const getConfigurationSummaryPanel = () => {
    if (toolIdentifier == null || toolIdentifier === "" || toolConfiguration == null) {
      return <></>;
    }
    
    switch (toolIdentifier) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_API_INTEGRATOR:
        return (
          <div className={"text-center p-5 text-muted mt-5"}>
            Connection configuration is handled using Endpoints.
          </div>
        );
      case "jenkins":
        return (
          <JenkinsToolConfigurationSummaryPanel
            jenkinsToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, jenkinsConnectionMetadata)}
          />
        );
      case "jira":
        return (
          <JiraToolConfigurationSummaryPanel
            jiraToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, jiraToolConnectionMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB:
        return (
          <GithubToolConfigurationSummaryPanel
            githubToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, githubConnectionMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB:
        return (
          <GitlabToolConfigurationSummaryPanel
            gitlabToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, gitlabConnectionMetadata)}
          />
        );
      case "bitbucket":
        return (
          <BitbucketToolConfigurationSummaryPanel
            bitbucketToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, bitbucketConnectionMetadata)}
          />
        );
      case "spinnaker":
        return (
          <SpinnakerToolConfigurationSummaryPanel
            spinnakerToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, spinnakerConnectionMetadata)}
          />
        );
      case "cypress":
        return (
          <CypressToolConfigurationSummaryPanel
            cypressToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, cypressConnectionMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
        return (
          <ArgoToolConfigurationSummaryPanel
            argoToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, argoConnectionMetadata)}
          />
        );
      case "anchore-scan":
        return (
          <AnchoreScanToolConfigurationSummaryPanel
            anchoreScanToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, anchoreScanConnectionMetadata)}
          />
        );
      case "anchore-integrator":
        return (
          <AnchoreIntegratorToolConfigurationSummaryPanel
            anchoreIntegratorToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, anchoreIntegratorConnectionMetadata)}
          />
        );
      case "sonar":
        return (
          <SonarToolConfigurationSummaryPanel
            sonarToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, sonarConnectionMetadata)}
          />
        );
      case "aws_account":
        return (
          <AwsToolConfigurationSummaryPanel
            awsToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, awsConnectionMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR:
        return (
          <SfdcToolConfigurationSummaryPanel
            sfdcToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, sfdcConnectionMetadata)}
          />
        );
      case "nexus":
        return (
          <NexusToolConfigurationSummaryPanel
            nexusToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, nexusConnectionMetadata)}
          />
        );
      case "teams":
        return (
          <TeamsToolConfigurationSummaryPanel
            teamsToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, teamsConnectionMetadata)}
          />
        );
      case "octopus":
        return (
          <OctopusToolConfigurationSummaryPanel
            octopusToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, octopusConnectionMetadata)}
          />
        );
      case "slack":
        return (
          <SlackToolConfigurationSummaryPanel />
        );
      case "azure_account":
        return (
          <AzureToolConfigurationSummaryPanel
            azureToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, AzureConnectionMetadata)}
          />
        );
      case "azure-devops":
        return (
          <AzureDevopsToolConfigurationSummaryPanel
            azureToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, AzureDevopsConnectionMetadata)}
          />
        );
      case "jfrog_artifactory_maven":
      case "jfrog_artifactory_docker":
        return (
          <JFrogToolConfigurationSummaryPanel
            jFrogToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, jfrogConnectionMetadata)}
          />
        );
      case "servicenow":
        return (
          <ServiceNowToolConfigurationSummaryPanel
            serviceNowToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, serviceNowConnectionMetadata)}
          />
        );
      case "hashicorp_vault":
        return (
          <HashicorpVaultToolConfigurationSummaryPanel
            hashicorpVaultToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, HashicorpVaultConnectionMetadata)}
          />
        );
      case "kafka_connect":
        return (
          <KafkaConnectToolConfigurationSummaryPanel
            kafkaConnectToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, KafkaConnectConnectionMetadata)}
          />
        );
      case "coverity":
        return (
          <CoverityToolConfigurationSummaryPanel
            coverityToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, CoverityConnectionMetadata)}
          />
        );
      case "twistlock":
        return (
          <TwistlockToolConfigurationSummaryPanel
            twistlockToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, TwistlockConnectionMetadata)}
          />
        );
      case "mongodb_realm":
        return (
          <MongodbRealmToolConfigurationSummaryPanel
            mongodbRealmToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, mongodbeRealmConnectionMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.FLYWAY_DATABASE_MIGRATOR:
        return (
          <FlywayDatabaseToolConnectionSummaryPanel
            flywayToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, flywayDatabaseToolConnectionMetadata)}
          />
        );
      case "informatica":
        return (
          <InformaticaToolConfigurationSummaryPanel
            informaticaToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, InformaticaConnectionMetadata)}
          />
        );
      //TODO: We need to rename either the old or the new metadata
      // case "azure":
      //   break;
      // return (
      //   <AzureV2ToolConfigurationSummaryPanel
      //     azureToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, AzureV2ConnectionMetadata)}
      //   />
      // );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.INFORMATICA_IDQ:
        return (
          <InformaticaIdqToolConfigurationSummaryPanel
            informaticaIdqToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, InformaticaIdqConnectionMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GCHAT:
        return (
          <GChatToolConfigurationSummaryPanel
            gChatToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, gchatConnectionMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.FORTIFY:
        return (
          <FortifyToolConfigurationSummaryPanel
            fortifyToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, FortifyMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SNYK:
        return (
          <SnykToolConfigurationSummaryPanel
            snykToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, snykConnectionMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.AQUASEC:
        return (
          <AquasecToolConfigurationSummaryPanel
            aquasecToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, AquasecMetadata)}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.ORACLE_FUSION:
        return (
          <OracleFusionToolConfigurationSummaryPanel
            oracleFusionToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, OracleFusionMetadata)}
          />
        );
      default:
        return <div className="text-center p-5 text-muted mt-5">Summary Panel is not currently available for this tool configuration.</div>;
    }
  };
  
  return (
    <ToolConnectionSummaryContainer>
      {getConfigurationSummaryPanel()}
    </ToolConnectionSummaryContainer>
  );
}

ToolConfigurationSummaryPanel.propTypes = {
  toolIdentifier: PropTypes.string,
  toolConfiguration: PropTypes.object,
};


export default ToolConfigurationSummaryPanel;
