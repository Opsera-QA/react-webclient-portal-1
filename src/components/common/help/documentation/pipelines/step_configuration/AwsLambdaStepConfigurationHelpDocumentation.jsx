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
          The AWS Lambda Service workflow requires the setup in both Tasks and Pipeline. Once the user enters a certain static information for the task, the task must be linked to the respective step in the Pipeline. To set up an AWS Lambda Service pipeline, there are 3 steps required in the workflow including this <b>Publish AWS Lambda</b> step:
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
          To view in depth documentation on task and pipeline setup, view the <a href="https://docs.opsera.io/aws-native-support/aws-lambda-functions" target="_blank" rel="noreferrer"><b>AWS Lambda Functions Help Documentation</b>. </a>

          Once step is configured with Publish AWS Lambda set as tool, set the following values:
        </div>
        <ul style={{listStyleType: "none"}}>
          <li><div className={"mt-3"}><b>Action</b> - Select Create from the drop-down to trigger function creation.</div></li>
          <li><b>AWS Tool</b> - Select the AWS Tool that matches the tool used in template creation in Tasks.</li>
          <li><b>Lambda Function - S3 Push Mapping</b> - Select the Lambda function templates and map it to the respective s3 step(s):
            <ul>
              <li><b>Select Lambda Function</b> - Select the Lambda function templates created in Tasks.</li>
              <li><b>Select S3 Push Step</b> - Select the S3 Push Step to map the function to. If the user has multiple s3 steps in the pipeline the user can map individual functions to different s3 steps thereby giving them the ability to create multiple functions as part of one pipeline step.</li>
            </ul></li>
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