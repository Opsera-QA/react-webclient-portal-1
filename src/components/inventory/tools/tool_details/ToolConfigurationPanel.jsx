import React, {useContext} from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";

import GitHubConfiguration from "../forms/github";
import GitlabToolConfiguration from "../forms/gitlab";
import BitbucketToolConfiguration from "../forms/bitbucket";
import ArgoToolConfiguration from "./tool_jobs/argo/ArgoToolConfiguration";
import AWSToolConfiguration from "../forms/aws";
import SFDCToolConfiguration from "../forms/sfdc";
import PipelineActions from "../../../workflow/pipeline-actions";
import {AuthContext} from "../../../../contexts/AuthContext";
import JenkinsToolConfiguration from "./tool_jobs/jenkins/JenkinsToolConfiguration";
import NexusToolConfiguration from "./tool_jobs/nexus/NexusToolConfiguration";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import toolsActions from "../tools-actions";
import JiraToolConfiguration from "./tool_jobs/jira/JiraToolConfiguration";
import TeamsToolConfiguration from "./tool_jobs/teams/TeamsToolConfiguration";
import OctopusToolConfiguration from "./tool_jobs/octopus/OctopusToolConfiguration";
import SlackToolConfiguration from "./tool_jobs/slack/SlackToolConfiguration";
import SonarToolConfiguration from "./tool_jobs/sonar/SonarToolConfiguration";
import SpinnakerToolConfiguration from "./tool_jobs/spinnaker/SpinnakerToolConfiguration";
import CypressToolConfiguration from "./tool_jobs/cypress/CypressToolConfiguration";
import AnchoreIntegratorToolConfiguration from "./tool_jobs/anchore_integrator/AnchoreIntegratorToolConfiguration";
import AnchoreScanToolConfiguration from "./tool_jobs/anchore_scan/AnchoreScanToolConfiguration";

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
    return await PipelineActions.saveToVault(postBody, getAccessToken);
  };

  const getConfiguration = (toolIdentifier) => {
    switch (toolIdentifier) {
      case "jenkins":
        return <JenkinsToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "jira":
        return <JiraToolConfiguration toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "github":
        return <GitHubConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "gitlab":
        return <GitlabToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "bitbucket":
        return <BitbucketToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "spinnaker":
        return <SpinnakerToolConfiguration toolData={toolData.data} saveToolConfiguration={saveToolConfiguration} />;
      case "cypress":
        return <CypressToolConfiguration toolData={toolData} />;
      case "argo":
        return <ArgoToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "anchore-scan":
        return <AnchoreScanToolConfiguration toolData={toolData} />;
      case "anchore-integrator":
        return <AnchoreIntegratorToolConfiguration toolData={toolData} />;
      case "sonar":
        return <SonarToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "aws_account":
        return <AWSToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "sfdc-configurator":
        return <SFDCToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "nexus":
        return <NexusToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
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
