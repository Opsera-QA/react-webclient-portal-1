import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function DockerEcrPushStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>To set up an ECS Service pipeline, there are 3 steps required in the workflow including this step:</div>
        <div>
          <ul style={{listStyleType: "none"}}>
            <li>Build - Uses Jenkins tool.</li>
            <li><b>Docker Push - Uses Docker ECR Push tool.</b></li>
            <li>Deploy - Uses AWS ECS Deploy tool. </li>
          </ul>
        </div>
        <div className={"ml-2 mb-2"}>The prerequisites for ECS Service creation pipeline also include task creation in <b>Tasks</b>. To view in depth documentation on task and pipeline setup, view the <a href="https://opsera.atlassian.net/l/c/H0TPP1JD/" target="_blank" rel="noreferrer">AWS Elastic Container Services documentation</a>.
        </div>
        <div className={"ml-2"}>
          <ol>
            <li>Once the initial Step Setup is configured with the Azure AKS tool, set the following values:
            <ul style={{listStyleType: "none"}}>
              <li><b>Jenkins Tool</b> - Select a configured tool from the Tool Registry.</li>
              <li><b>Jenkins Job</b> - Select Docker Push. This must be created in Jobs section of the selected Jenkins tool. </li>
              <li><b>AWS Credentials</b> - Select a configured tool from the Tool Registry. </li>
              <li><b>Build Step Info</b> - The drop down displays the step name given to the build step in the pipeline.</li>
              <li><b>Want to use an existing repository?</b> - To use an existing repository, turn the toggle on. A list of existing repositories will be fetched to select from. </li>
              <li><b>ECR Repository</b> - To use a new repository, provide a value for the repository name. </li>
            </ul>
            </li>
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
      helpTopic={"Docker ECR Push Step Configuration"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}
export default React.memo(DockerEcrPushStepConfigurationHelpDocumentation);