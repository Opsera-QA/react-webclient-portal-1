import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";

import GitHubConfiguration from "../forms/github";
import GitlabToolConfiguration from "../forms/gitlab";
import BitbucketToolConfiguration from "../forms/bitbucket";
import SpinnakerToolConfiguration from "../forms/spinnaker";
import CypressToolConfiguration from "../forms/cypress";
import ArgoToolConfiguration from "../forms/argo";
import AnchoreToolConfiguration from "../forms/anchore";
import AnchoreIntegratorToolConfiguration from "../forms/anchore-integrator";
import SonarToolConfiguration from "../forms/sonar";
import AWSToolConfiguration from "../forms/aws";
import SFDCToolConfiguration from "../forms/sfdc";
import PipelineActions from "../../../workflow/pipeline-actions";
import {AuthContext} from "../../../../contexts/AuthContext";
import {axiosApiService} from "../../../../api/apiService";
import JenkinsToolConfiguration from "./tool_jobs/jenkins/JenkinsToolConfiguration";
import {
  getUpdateFailureResultDialog,
  getUpdateSuccessResultDialog
} from "../../../common/toasts/toasts";


function ToolConfigurationPanel({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);

  const saveToolConfiguration = async (configurationItem) => {
    let newToolData = toolData;
    newToolData["configuration"] = configurationItem.configuration;
    
    const accessToken = await getAccessToken();
    const apiUrl = `/registry/${newToolData._id}/update`;
    try {
      let response = await axiosApiService(accessToken).post(apiUrl, newToolData.data);
      let toast = getUpdateSuccessResultDialog( "Tool Configuration", setShowToast);
      setToast(toast);
      setShowToast(true);
      // console.log("response: " + JSON.stringify(response));
    } catch (error) {
      let toast = getUpdateFailureResultDialog("Tool Type", error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    }
  };

  const saveToVault = async (postBody) => {
    const response = await PipelineActions.saveToVault(postBody, getAccessToken);
    return response;
  };

  // TODO: Rewrite so just tooldata is sent instead of id and tooldata
  const getConfiguation = (toolIdentifier) => {
    switch (toolIdentifier) {
      case "jenkins":
        return <JenkinsToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "github":
        return <GitHubConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "gitlab":
        return <GitlabToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "bitbucket":
        return <BitbucketToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "spinnaker":
        return <SpinnakerToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "cypress":
        return <CypressToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "argo":
        return <ArgoToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "anchore-scan":
        return <AnchoreToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "anchore-integrator":
        return <AnchoreIntegratorToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "sonar":
        return <SonarToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "aws_account":
        return <AWSToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      case "sfdc-configurator":
        return <SFDCToolConfiguration toolId={toolData._id} toolData={toolData.data} fnSaveChanges={saveToolConfiguration} fnSaveToVault={saveToVault} />;
      default:
        return <div className="text-center p-5 text-muted mt-5">Configuration is not currently available for this tool.</div>
    }
  }
  

  return (
    <div className="m-2">
      {showToast && toast}
      <div className="text-muted pb-3">Enter tool specific configuration information below.  These settings will be used for pipelines.</div>
      {toolData && getConfiguation(toolData.getData("tool_identifier").toLowerCase()) }
    </div>
  );
}

ToolConfigurationPanel.propTypes = {
  toolId: PropTypes.string,
  toolData: PropTypes.object,
};


export default ToolConfigurationPanel;
