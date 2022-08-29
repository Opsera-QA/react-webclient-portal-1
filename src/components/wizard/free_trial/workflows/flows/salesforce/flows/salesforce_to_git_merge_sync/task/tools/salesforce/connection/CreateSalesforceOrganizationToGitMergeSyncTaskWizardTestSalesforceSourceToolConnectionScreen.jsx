import React from "react";
import PropTypes from "prop-types";
import WorkflowWizardToolConnectionScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/test_connection/WorkflowWizardToolConnectionScreenBase";
import { taskHelper } from "components/tasks/task.helper";
import {
  CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS
} from "../../../CreateSalesforceOrganizationToGitMergeSyncTaskWizard";

export default function CreateSalesforceOrganizationToGitMergeSyncTaskWizardTestSalesforceSourceToolConnectionScreen({
  task,
  setTask,
  setCurrentScreen,
  salesforceToolId,
  flow,
}) {
  const onSuccessFunction = () => {
    setTask({...taskHelper.updateSfdcToolIdForSalesforceTask(task, salesforceToolId, flow)});
    setCurrentScreen(
        CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN,
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
      toolName={"Sfdc"}
    />
  );
}

CreateSalesforceOrganizationToGitMergeSyncTaskWizardTestSalesforceSourceToolConnectionScreen.propTypes = {
  task: PropTypes.string,
  salesforceToolId: PropTypes.string,
  setTask: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  flow: PropTypes.string,
};

