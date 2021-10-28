import React, { useContext } from "react";
import HelpOverlayBase from "../../../../overlays/center/help/HelpOverlayBase";
import { DialogToastContext } from "contexts/DialogToastContext";

function AzureAksDeployPipelineStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"mb-1 ml-4"}>To set up an Azure Service Deployment pipeline, there are 3 steps required in the workflow including this step:</div>
        <div className={"ml-4"}>
          <ol>
            <li>Build - Step configured with Jenkins tool.</li>
            <li>ACR Push - Step configured with Azure ACR Push tool.</li>
            <li><b>AKS Deploy - Step configured with Azure AKS Deploy tool. </b></li>
          </ol>
        </div>
        <div className={"my-3 ml-4"}>The prerequisites for setting up an Azure Service Deployment pipeline also include task creation in Tasks (in order for the Azure AKS Deploy step to deploy docker images to the Azure Cluster). In order for this step to run successfully, there must also be a Build step using Jenkins and an Azure AKS Deploy step in the pipeline workflow as outlined above. To view in depth documentation on task and pipeline setup, view the <b><a href="https://opsera.atlassian.net/l/c/iCgHTCUY" target="_blank" rel="noreferrer">Azure AKS Functionality documentation</a></b>. </div>
        <div className={"ml-4"}>
          <ol>
            <li>Once the step is configured with Azure AKS set as the tool, set the following values:
              <ul style={{listStyleType: "none"}}>
                <li><b>Azure Tool</b> - Select the tool that was used to create the Azure cluster.</li>
                <li><b>Azure Credential</b> - Drop down values will include Applications configured in the selected tool. </li>
                <li><b>Cluster Name</b> - Drop down includes successfully run clusters created in Tasks. </li>
                <li><b>Generate Dynamic Service Name</b> - When switch is enabled, a unique service name for each pipeline run using the Dynamic Name Prefix given and the run count will be generated (for example: PrefixName -1, PrefixName-2).</li>
                <li><b>Service Name</b> - Azure Service names must also be unique hence we have the ability to generate unique service names for every run based on the run count which can be enabled via the specified toggle in the pipeline step. </li>
                <li><b>Resource Group</b> - If the Cluster Name selected was created via Opsera then the user should let the resource group option be disabled. However, If the selected clustgier was not created via opsera then the user has to enable the resource group toggle and select the correct resource group with to the selected cluster. The drop down will contain generated names consisting of the above cluster name and “resource”. </li>
                <li><b>Host URL</b> - Host URL is unique to user. </li>
                <li><b>Service Port</b> - Select the location where service will be deployed. </li>
                <li><b>Artifact Step</b> - Select the corresponding Azure ACR push step. </li>
              </ul></li>
            <li>Select <b>Save</b> and proceed to setting up the next pipeline steps.</li>
          </ol>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Azure AKS Deploy Step Configuration"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}

export default React.memo(AzureAksDeployPipelineStepConfigurationHelpDocumentation);