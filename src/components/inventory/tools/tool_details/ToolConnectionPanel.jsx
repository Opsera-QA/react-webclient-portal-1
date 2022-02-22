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
import FlywayDatabaseToolConfiguration from "./tool_jobs/flyway_database/FlywayDatabaseToolConfiguration";
import InformaticaToolConfiguration from "./tool_jobs/informatica/InformaticaToolConfiguration";
import TerraformCloudToolConfiguration from "./tool_jobs/terraform_cloud/TerraformCloudToolConfiguration";
import GcpToolConfiguration from "./tool_jobs/gcp/GcpToolConfiguration";

function ToolConnectionPanel({ toolData }) {
  const getConnectionPanel = () => {
    if (toolData == null) {
      return <></>;
    }

    switch (toolData.getData("tool_identifier")) {
      case "jenkins":
        return <JenkinsToolConfiguration toolData={toolData} />;
      case "jira":
        return <JiraToolConfiguration toolData={toolData} />;
      case "github":
        return <GithubToolConfiguration toolData={toolData} />;
      case "gitlab":
        return <GitlabToolConfiguration toolData={toolData} />;
      case "bitbucket":
        return <BitbucketToolConfiguration toolData={toolData} />;
      case "spinnaker":
        return <SpinnakerToolConfiguration toolData={toolData} />;
      case "cypress":
        return <CypressToolConfiguration toolData={toolData} />;
      case "argo":
        return <ArgoToolConfiguration toolData={toolData} />;
      case "anchore-scan":
        return <AnchoreScanToolConfiguration toolData={toolData} />;
      case "anchore-integrator":
        return <AnchoreIntegratorToolConfiguration toolData={toolData} />;
      case "sonar":
        return <SonarToolConfiguration toolData={toolData} />;
      case "aws_account":
        return <AwsToolConfiguration toolData={toolData} />;
      case "sfdc-configurator":
        return <SfdcToolConfiguration toolData={toolData} />;
      case "nexus":
        return <NexusToolConfiguration toolData={toolData} />;
      case "teams":
        return <TeamsToolConfiguration toolData={toolData} />;
      case "octopus":
        return <OctopusToolConfiguration toolData={toolData} />;
      case "slack":
        return <SlackToolConfiguration toolData={toolData}/>;
      case "azure_account":
        return <AzureToolConfiguration toolData={toolData} />;
      case "jfrog_artifactory_maven":
      case "jfrog_artifactory_docker":
        return <JFrogToolConfiguration toolData={toolData} />;
      case "servicenow":
        return <ServiceNowToolConfiguration toolData={toolData} /> ;
      case "azure-devops":
        return <AzureDevopsToolConfiguration toolData={toolData} />;
      case "hashicorp_vault":
        return <HashicorpVaultToolConfiguration toolData={toolData} />;
      case "kafka_connect":
        return <KafkaConnectToolConfiguration toolData={toolData} />;
      case "coverity":
        return <CoverityToolConfiguration toolData={toolData} />;
      case "twistlock":
        return <TwistlockToolConfiguration toolData={toolData} />;
      case "azure":
        return <AzureV2ToolConfiguration toolData={toolData} />;
      case "ansible":
        return <AnsibleToolConfiguration toolData={toolData} />;
      case "mongodb_realm":        
        return <MongodbRealmToolConfiguration toolData={toolData} />;
      case "flyway-database-migrator":
        return <FlywayDatabaseToolConfiguration toolData={toolData} />;
      case "informatica":
        return <InformaticaToolConfiguration toolData={toolData} />;
      case "terraform-cloud":
        return <TerraformCloudToolConfiguration toolData={toolData} />;
      case "gcp_account":
        return <GcpToolConfiguration toolData={toolData} />;
      default:
        return <div className="text-center p-5 text-muted mt-5">Configuration is not currently available for this tool.</div>;
    }
  };
  
  return (
    <div className="p-3">
      {getConnectionPanel() }
    </div>
  );
}

ToolConnectionPanel.propTypes = {
  toolId: PropTypes.string,
  toolData: PropTypes.object,
};


export default ToolConnectionPanel;
