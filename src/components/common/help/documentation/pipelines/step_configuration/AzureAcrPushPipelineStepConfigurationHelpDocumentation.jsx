import React, { useContext } from "react";
import HelpOverlayBase from "../../../../overlays/center/help/HelpOverlayBase";
import { DialogToastContext } from "contexts/DialogToastContext";

function AzureAcrPushPipelineStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"mb-1 ml-4"}>To set up an Azure Service Deployment pipeline, the following 3 pipeline steps are required in the workflow:</div>
        <div className={"ml-4"}>
          <ol>
            <li>Build - Step configured with Jenkins tool.</li>
            <li><b>ACR Push - Step configured with Azure ACR Push tool.</b></li>
            <li>AKS Deploy - Step configured with Azure AKS Deploy tool. </li>
          </ol>
        </div>
        <div className={"my-3 ml-4"}>The prerequisites for setting up an Azure Service Deployment pipeline also include task creation in Tasks (in order for the Azure AKS Deploy step to deploy docker images to the Azure Cluster). There must also be a successfully configured Jenkins tool containing an Azure Docker Push job. In order for this step to run successfully, there must also be a Build step using Jenkins and an Azure AKS Deploy step in the pipeline workflow as outlined above. To view in depth documentation on task and pipeline setup, view the <b><a href="https://opsera.atlassian.net/l/c/iCgHTCUY" target="_blank" rel="noreferrer">Azure AKS Functionality documentation</a></b>.</div>
        <div className={"ml-4"}>
          <ol>
            <li>Once the initial Step Setup is configured with the Azure ACR Push tool, set the following values:
              <ul style={{listStyleType: "none"}}>
                <li><b>Jenkins Tool</b> - Select a configured Jenkins tool from Tool Registry.</li>
                <li><b>Jenkins Job</b> - Select the Azure Docker Push job that was created in the selected Jenkins tool.</li>
                <li><b>Build Step</b> - Select the name of the preceding build step.</li>
                <li><b>Azure Tool</b> - Select the configured Azure Account Legacy tool from Tool Registry.</li>
                <li><b>Resource</b> - Value found in the Azure portal.</li>
                <li><b>Azure Registry</b> - Select the container registry to push the images into.</li>
                <li><b>Use Existing Repository</b> - Toggle on to view and select an existing repository in the Azure Registry to push the images into. Toggle off to create a new repository where the images will be pushed. Then enter a unique name for the new repository.</li>
               <li><b>Repository Name</b> - Select the name of the repository in the container to push to.</li></ul></li>
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
      helpTopic={"Azure ACR Push Step Configuration"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}

export default React.memo(AzureAcrPushPipelineStepConfigurationHelpDocumentation);