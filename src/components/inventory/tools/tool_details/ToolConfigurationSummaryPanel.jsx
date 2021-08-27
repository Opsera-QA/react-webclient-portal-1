import React from "react";
import PropTypes from "prop-types";
import JenkinsToolConfigurationSummaryPanel
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/JenkinsToolConfigurationSummaryPanel";
import modelHelpers from "components/common/model/modelHelpers";
import jenkinsConnectionMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jenkins-connection-metadata";
import JiraToolConfigurationSummaryPanel
  from "components/inventory/tools/tool_details/tool_jobs/jira/JiraToolConfigurationSummaryPanel";
import jiraConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/jira/jira-connection-metadata";
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

function ToolConfigurationSummaryPanel({ toolConfiguration, toolIdentifier }) {
  const getConfigurationSummaryPanel = () => {
    if (toolIdentifier == null || toolConfiguration == null) {
      return <></>;
    }
    
    switch (toolIdentifier) {
      case "jenkins":
        return (
          <JenkinsToolConfigurationSummaryPanel
            jenkinsToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, jenkinsConnectionMetadata)}
          />
        );
      case "jira":
        return (
          <JiraToolConfigurationSummaryPanel
            jiraToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, jiraConnectionMetadata)}
          />
        );
      case "github":
        return (
          <GithubToolConfigurationSummaryPanel
            githubToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, githubConnectionMetadata)}
          />
        );
      case "gitlab":
        return (
          <GitlabToolConfigurationSummaryPanel
            githubToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolConfiguration, gitlabConnectionMetadata)}
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
      case "argo":
        // return <ArgoToolConfiguration toolData={toolData} />;
      case "anchore-scan":
        // return <AnchoreScanToolConfiguration toolData={toolData} />;
      case "anchore-integrator":
        // return <AnchoreIntegratorToolConfiguration toolData={toolData} />;
      case "sonar":
        // return <SonarToolConfiguration toolData={toolData} />;
      case "aws_account":
        // return <AwsToolConfiguration toolData={toolData} />;
      case "sfdc-configurator":
        // return <SfdcToolConfiguration toolData={toolData} />;
      case "nexus":
        // return <NexusToolConfiguration toolData={toolData} />;
      case "teams":
        // return <TeamsToolConfiguration toolData={toolData} />;
      case "octopus":
        // return <OctopusToolConfiguration toolData={toolData} />;
      case "slack":
        // return <SlackToolConfiguration toolData={toolData}/>;
      case "azure_account":
        // return <AzureToolConfiguration toolData={toolData} />;
      case "jfrog_artifactory_maven":
      case "jfrog_artifactory_docker":
        // return <JFrogToolConfiguration toolData={toolData} />;
      case "servicenow":
        // return <ServiceNowToolConfiguration toolData={toolData} /> ;
      case "azure-devops":
        // return <AzureDevopsToolConfiguration toolData={toolData} />;
      case "hashicorp_vault":
        // return <HashicorpVaultToolConfiguration toolData={toolData} />;
      case "kafka_connect":
        // return <KafkaConnectToolConfiguration toolData={toolData} />;
      case "coverity":
        // return <CoverityToolConfiguration toolData={toolData} />;
      case "twistlock":
        // return <TwistlockToolConfiguration toolData={toolData} />;
      default:
        return <div className="text-center p-5 text-muted mt-5">Summary Panel is not currently available for this tool configuration.</div>;
    }
  };
  
  return (
    <div className="p-3">
      {getConfigurationSummaryPanel() }
    </div>
  );
}

ToolConfigurationSummaryPanel.propTypes = {
  toolIdentifier: PropTypes.string,
  toolConfiguration: PropTypes.object,
};


export default ToolConfigurationSummaryPanel;
