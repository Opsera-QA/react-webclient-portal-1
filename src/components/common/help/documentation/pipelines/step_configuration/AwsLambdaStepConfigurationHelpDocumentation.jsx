import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function AwsLambdaStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"mb-1 ml-4"}>
          The AWS Lambda Service workflow requires the setup in both Tasks and Pipeline. Once the user enters a certain static information for the task, the task must be linked to the respective step in the Pipeline. To set up an AWS Lambda Service pipeline, there are 3 steps required in the workflow including this <b>AWS Lambda Deploy</b> step:
        </div>
        <div>
          <ul style={{listStyleType: "none"}}>
            <li>1. Maven Build - Uses Jenkins tool.</li>
            <li>2. S3 Push - Uses Publish to S3 tool.</li>
            <li>3. Publish AWS Lambda - Uses AWS Lambda tool </li>
          </ul>
        </div>
        <div className={"mb-1 ml-4"}>
          The prerequisites for AWS Lambda service pipeline also include task creation in <b>Tasks</b>.
          To view in depth documentation on task and pipeline setup, view the <a href="https://docs.opsera.io/aws-native-support/aws-ecs" target="_blank" rel="noreferrer"><b>AWS Lambda Functions Help Documentation</b>. </a>
          Once step is configured with AWS Lambda Deploy set as tool, set the following values:
        </div>
        <ul style={{listStyleType: "none"}}>
          <li><div className={"mt-3"}><b>AWS Tool</b> - Select a configured AWS tool.</div></li>
          <li><b>Function Name</b> - Create a unique name for the function. Click <b>Validate</b> to confirm that the name is unique and does not exist in AWS yet. If the name already exists, an error will be displayed.</li>
          <li><b>Handler</b> - Enter a syntax. (Example for Java8: example.Hello::handleRequest).</li>
          <li><b>IAM Role</b> - Select a role fetched from AWS.</li>
          <li><b>Runtime</b> - Select the language to write the function. Java 8 is supported.</li>
        </ul>
        <div className={"ml-4"}>Click <b>Save</b>.</div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpDocumentation={getHelpDocumentation()}
      helpTopic={"AWS Lambda Step Configuration"}
    />
  );
}
export default React.memo(AwsLambdaStepConfigurationHelpDocumentation);