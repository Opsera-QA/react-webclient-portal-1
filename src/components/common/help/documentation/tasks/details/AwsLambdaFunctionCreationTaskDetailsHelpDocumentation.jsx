import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {getTaskTypeLabel, TASK_TYPES} from "../../../../../tasks/task.types";


function AwsLambdaFunctionCreationTaskDetailsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div className={"ml-2"}>
        <div>Create templates of AWS Lambda Functions and deploy them live in Opsera pipelines. This workflow requires setup in both Tasks and Pipeline. For more detailed information on the {getTaskTypeLabel(TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION)} workflow including pipeline setup, view the <a href="https://opsera.atlassian.net/l/c/uCNgVd1E" target="_blank" rel="noreferrer"><b>AWS Lambda Function Creation Task Documentation</b>.</a></div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"AWS Lambda Function Creation Task Details"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(AwsLambdaFunctionCreationTaskDetailsHelpDocumentation);