import React from "react";
import PropTypes from "prop-types";
import JenkinsToolConfigurationSummaryPanel
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/JenkinsToolConfigurationSummaryPanel";
import modelHelpers from "components/common/model/modelHelpers";
import jenkinsConnectionMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jenkins-connection-metadata";

function ToolConfigurationSummaryPanel({ toolData }) {
  const getConfigurationSummaryPanel = () => {
    if (toolData == null) {
      return <></>;
    }
    
    switch (toolData?.getData("tool_identifier")) {
      case "jenkins":
        return (
          <JenkinsToolConfigurationSummaryPanel
            jenkinsToolConfigurationModel={modelHelpers.parseObjectIntoModel(toolData?.configuration, jenkinsConnectionMetadata)}
          />
        );
      case "jira":
        // return <JiraToolConfiguration toolData={toolData} />;
      case "github":
        // return <GithubToolConfiguration toolData={toolData} />;
      case "gitlab":
        // return <GitlabToolConfiguration toolData={toolData} />;
      case "bitbucket":
        // return <BitbucketToolConfiguration toolData={toolData} />;
      case "spinnaker":
        // return <SpinnakerToolConfiguration toolData={toolData} />;
      case "cypress":
        // return <CypressToolConfiguration toolData={toolData} />;
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
  toolData: PropTypes.object,
};


export default ToolConfigurationSummaryPanel;
