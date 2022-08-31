import React from "react";
import PropTypes from "prop-types";
import WorkflowWizardToolConnectionScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/test_connection/WorkflowWizardToolConnectionScreenBase";
import { taskHelper } from "components/tasks/task.helper";
import {
  CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS
} from "../../../CreateSalesforceOrganizationToGitMergeSyncTaskWizard";

export default function CreateSalesforceOrganizationToGitMergeSyncTaskWizardTestSalesforceSourceToolConnectionScreen({
  setCurrentScreen,
  setButtonContainer,
  salesforceToolId,
}) {
  const onSuccessFunction = () => {
    setCurrentScreen(
        CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.INITIALIZATION_SCREEN,
    );
  };

  const onFailureFunction = () => {
    setCurrentScreen(
        CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN,
    );
  };

  return (
    <WorkflowWizardToolConnectionScreenBase
      className={"m-3"}
      onSuccessFunction={onSuccessFunction}
      toolId={salesforceToolId}
      onFailureFunction={onFailureFunction}
      setButtonContainer={setButtonContainer}
      toolName={"Sfdc"}
    />
  );
}

CreateSalesforceOrganizationToGitMergeSyncTaskWizardTestSalesforceSourceToolConnectionScreen.propTypes = {
  salesforceToolId: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
};

