import React, {useContext} from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";

import SfdcToolConfiguration from "components/inventory/tools/tool_details/tool_jobs/sfdc/SfdcToolConfiguration";
import ArgoToolConfiguration from "./tool_jobs/argo/ArgoToolConfiguration";
import JenkinsToolConfiguration from "./tool_jobs/jenkins/JenkinsToolConfiguration";
import NexusToolConfiguration from "./tool_jobs/nexus/NexusToolConfiguration";
import toolsActions from "../tools-actions";
import JiraToolConfiguration from "./tool_jobs/jira/JiraToolConfiguration";
import TeamsToolConfiguration from "./tool_jobs/teams/TeamsToolConfiguration";
import OctopusToolConfiguration from "./tool_jobs/octopus/OctopusToolConfiguration";
import SlackToolConfiguration from "./tool_jobs/slack/SlackToolConfiguration";
import SonarToolConfiguration from "./tool_jobs/sonar/SonarToolConfiguration";
import SpinnakerToolConfiguration from "./tool_jobs/spinnaker/SpinnakerToolConfiguration";
import BitbucketToolConfiguration from "./tool_jobs/bitbucket/BitbucketToolConfiguration";
import AnchoreScanToolConfiguration from "./tool_jobs/anchore_scan/AnchoreScanToolConfiguration";
import GithubToolConfiguration from "./tool_jobs/github/GithubToolConfiguration";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import pipelineActions from "components/workflow/pipeline-actions";
import AnchoreIntegratorToolConfiguration
  from "components/inventory/tools/tool_details/tool_jobs/anchore_integrator/AnchoreIntegratorToolConfiguration";
import AwsToolConfiguration from "./tool_jobs/aws/AwsToolConfiguration";
import CypressToolConfiguration from "./tool_jobs/cypress/CypressToolConfiguration";
import GitlabToolConfiguration from "components/inventory/tools/tool_details/tool_jobs/gitlab/GitlabToolConfiguration";

function ToolConfigurationPanel({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);

  const saveToolConfiguration = async (configurationItem) => {
    try {
      let newToolData = toolData;
      newToolData["configuration"] = configurationItem.configuration;
      await toolsActions.updateToolConfiguration(newToolData.data, getAccessToken);
      toastContext.showUpdateSuccessResultDialog("Tool Configuration")
    } catch (error) {
      toastContext.showUpdateFailureResultDialog("Tool Configuration", error);
      console.error(error);
    }
  };

  const saveToVault = async (postBody) => {
    return await pipelineActions.saveToVault(postBody, getAccessToken);
  };

  const getConfiguration = (toolIdentifier) => {
    switch (toolIdentifier) {
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
        return <SpinnakerToolConfiguration toolData={toolData.data} saveToolConfiguration={saveToolConfiguration} />;
      case "cypress":
        return <CypressToolConfiguration toolData={toolData} />;
      case "argo":
        return <ArgoToolConfiguration toolData={toolData} />;
      case "anchore-scan":
        return <AnchoreScanToolConfiguration toolData={toolData} />;
      case "anchore-integrator":
        return <AnchoreIntegratorToolConfiguration toolData={toolData} />;
      case "sonar":
        return <SonarToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "aws_account":
        return <AwsToolConfiguration toolData={toolData} />;
      case "sfdc-configurator":
        return <SfdcToolConfiguration toolData={toolData} />;
      case "nexus":
        return <NexusToolConfiguration toolData={toolData} />;
      case "teams":
        return <TeamsToolConfiguration toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "octopus":
        return <OctopusToolConfiguration toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "slack":
        return <SlackToolConfiguration toolData={toolData.data}/>;
      default:
        return <div className="text-center p-5 text-muted mt-5">Configuration is not currently available for this tool.</div>
    }
  }
  

  return (
    <div className="p-3">
      <div className="text-muted pb-3">Enter tool specific configuration information below.  These settings will be used for pipelines.</div>
      {toolData && getConfiguration(toolData.getData("tool_identifier").toLowerCase()) }
    </div>
  );
}

ToolConfigurationPanel.propTypes = {
  toolId: PropTypes.string,
  toolData: PropTypes.object,
};


export default ToolConfigurationPanel;
