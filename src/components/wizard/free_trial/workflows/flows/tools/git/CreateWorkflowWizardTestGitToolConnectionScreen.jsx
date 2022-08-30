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
import jenkinsAccountActions
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/jenkinsToolAccounts.actions";

export default function CreateWorkflowWizardTestGitToolConnectionScreen({
  gitToolId,
  jenkinsToolId,
  gitToolOption,
  onSuccessFunction,
  onFailureFunction,
  setButtonContainer,
  className,
  createAccountInSharedJenkinsTool,
}) {
  const {
    toastContext,
    isMounted,
    cancelTokenSource,
    getAccessToken
  } = useComponentStateReference();

  const onSuccess = async () => {
    if (createAccountInSharedJenkinsTool === true) {
      await createAccount();
    }

    onSuccessFunction();
  };

  const createAccount = async () => {
    try {
      const postBody = {
        toolId: jenkinsToolId,
        service: gitToolOption,
        credentailsToolId: gitToolId,
        credentialsId: gitToolId,
        credentialsDescription: gitToolId,
      };
      const newAccountModel = modelHelpers.parseObjectIntoModel(
        postBody,
        jenkinsToolAccountMetadata,
      );
      await jenkinsAccountActions.createJenkinsAccountV2(
        getAccessToken,
        cancelTokenSource,
        jenkinsToolId,
        newAccountModel,
      );
      onSuccessFunction();
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(
          error,
          "Error Registering Git Account: ",
        );
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
      setButtonContainer={setButtonContainer}
    />
  );
}

CreateWorkflowWizardTestGitToolConnectionScreen.propTypes = {
  gitToolId: PropTypes.string,
  jenkinsToolId: PropTypes.string,
  className: PropTypes.string,
  onSuccessFunction: PropTypes.func,
  onFailureFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
  gitToolOption: PropTypes.string,
  createAccountInSharedJenkinsTool: PropTypes.bool,
};


