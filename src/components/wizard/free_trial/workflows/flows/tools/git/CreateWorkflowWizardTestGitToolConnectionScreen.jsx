import React from "react";
import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";
import modelHelpers from "components/common/model/modelHelpers";
import {
  jenkinsToolAccountMetadata
} from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/jenkinsToolAccount.metadata";
import WorkflowWizardToolConnectionScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/test_connection/WorkflowWizardToolConnectionScreenBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function CreateWorkflowWizardTestGitToolConnectionScreen(
  {
    gitToolId,
    jenkinsToolId,
    gitToolOption,
    onSuccessFunction,
    onFailureFunction,
    className,
  }) {
  const {
    toastContext,
    isMounted,
  } = useComponentStateReference();

  const onSuccess = () => {
    try {
      const postBody = {
        toolId: jenkinsToolId,
        service: gitToolOption,
        credentialsToolId: gitToolId,
        credentialsId: gitToolId,
        credentialsDescription: gitToolId,
      };
      const newAccountModel = modelHelpers.parseObjectIntoModel(postBody, jenkinsToolAccountMetadata);
      // TODO: Check with service dev on why this is failing
      // const accountLinkResponse = await jenkinsAccountActions.createJenkinsAccountV2(getAccessToken, cancelTokenSource, toolConfigId, newAccountModel);
      // newLogs.push(
      //     `Status: ${accountLinkResponse}\n`,
      //     `Continuing to next screen in a few seconds\n`,
      // );
      // setLogs([...newLogs]);

      onSuccessFunction();
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error, "Error Registering Git Account");
        onFailureFunction();
      }
    }
  };

  return (
    <WorkflowWizardToolConnectionScreenBase
      className={className}
      onSuccessFunction={onSuccess}
      toolId={gitToolId}
      onFailureFunction={onFailureFunction}
      toolName={capitalizeFirstLetter(gitToolOption)}
    />
  );
}

CreateWorkflowWizardTestGitToolConnectionScreen.propTypes = {
  gitToolId: PropTypes.string,
  jenkinsToolId: PropTypes.string,
  className: PropTypes.string,
  onSuccessFunction: PropTypes.func,
  onFailureFunction: PropTypes.func,
  gitToolOption: PropTypes.string,
};


