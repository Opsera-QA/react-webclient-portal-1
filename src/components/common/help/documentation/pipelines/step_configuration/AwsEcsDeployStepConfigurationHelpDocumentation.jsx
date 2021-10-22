import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function AwsEcsDeployStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"mb-1 ml-4"}>
          <b>Note:</b> To set up an ECS Service pipeline, there are 3 steps required in the workflow including this <b>AWS ECS Deploy</b> step:
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
          Once step is configured with AWS ECS Deploy set as tool, set the following values:
        </div>
        <ul style={{listStyleType: "none"}}>
          <li><div className={"mt-3"}><b>Docker Step</b> - The drop down displays the step name given to the docker step in the pipeline.</div></li>
          <li><b>Service Task</b> - Fetched from AWS ECS Service Tasks </li>
          <li><b>Generate Dynamic Service Name</b> - When switch is enabled, a unique service name for each pipeline run using the Dynamic Name Prefix given and the run count is provided(For Example - PrefixName-1) </li>
          <li><b>Dynamic Name Prefix</b> - Enter a prefix to be prepended to the uniquely generated name. </li>
          <li><b>Service Name Example</b> -  User has option to dynamically generate service names on runtime as AWS does not allow two services to have the same name. The user can give a prefix to the service and the pipeline will generate a unique service name with the prefix and the run count when the pipeline runs. </li>
          <li><b>Service Container Port</b> - This is the location where service will be deployed. Use only numbers. </li>
          <li><b>Delete Existing Resources Before Deployment</b> - Toggle on to delete the resource at the selected port before service deployment. </li>
        </ul>
        <div className={"ml-4"}>Select <b>Save</b>.</div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpDocumentation={getHelpDocumentation()}
      helpTopic={"AWS ECS Deploy Step Configuration"}
    />
  );
}
export default React.memo(AwsEcsDeployStepConfigurationHelpDocumentation);