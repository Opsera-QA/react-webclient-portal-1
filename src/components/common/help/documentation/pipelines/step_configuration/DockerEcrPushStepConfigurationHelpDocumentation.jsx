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
        <div className={"mb-1 ml-4"}>
          <b>Note:</b> To set up an ECS Service pipeline, there are 3 steps required in the workflow including this <b>Docker ECR Push</b> step:
        </div>
        <div>
          <ul style={{listStyleType: "none"}}>
            <li>1. Build - Uses Jenkins tool.</li>
            <li>2. Docker Push - Uses Docker ECR Push tool.</li>
            <li>3. Deploy - Uses AWS ECS Deploy tool. </li>
          </ul>
        </div>
        <div className={"mb-1 ml-4"}>
          The prerequisites for ECS Service creation pipeline also include task creation in <b>Tasks</b>.
          To view in depth documentation on task and pipeline setup, view the <a href="https://opsera.atlassian.net/l/c/H0TPP1JD/" target="_blank" rel="noreferrer">AWS Elastic Container Services documentation</a>.
          Once the step is configured with Docker ECR Push set as tool, set the following values:
        </div>
        <ul style={{listStyleType: "none"}}>
          <li><div className={"mt-3"}><b>Jenkins Tool</b> - Select a configured tool from the Tool Registry.</div></li>
          <li><b>Jenkins Job</b> - Select Docker Push. This must be created in Jobs section of the selected Jenkins tool. </li>
          <li><b>AWS Credentials</b> - Select a configured tool from the Tool Registry. </li>
          <li><b>Build Step Info</b> - The drop down displays the step name given to the build step in the pipeline.</li>
          <li><b>Want to use an existing repository?</b> - To use an existing repository, turn the toggle on. A list of existing repositories will be fetched to select from. </li>
          <li><b>ECR Repository</b> - To use a new repository, provide a value for the repository name. </li>
        </ul>
        <div className={"ml-4"}>
          Select <b>Save</b> and proceed to setting up the next pipeline steps.
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