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
import {salesforceWorkflowFlowConstants} from "../../salesforce/flows/salesforceWorkflowFlow.constants";

export default function CreateWorkflowWizardTestGitToolConnectionScreen({
  gitToolId,
  jenkinsToolId,
  gitToolOption,
  onSuccessFunction,
  onFailureFunction,
  className,
  flow,
}) {
  const { toastContext, isMounted, cancelTokenSource, getAccessToken } =
    useComponentStateReference();

  const onSuccess = async () => {
    switch (flow) {
      case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC:
      case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING:
      case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP:
      case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK:
        await createAccount();
        break;
      default:
        onSuccessFunction();
    }
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
  flow: PropTypes.string,
};


