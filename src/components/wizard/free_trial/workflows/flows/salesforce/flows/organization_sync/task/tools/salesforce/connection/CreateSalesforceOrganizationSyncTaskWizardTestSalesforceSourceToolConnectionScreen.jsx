import React from "react";
import PropTypes from "prop-types";
import WorkflowWizardToolConnectionScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/test_connection/WorkflowWizardToolConnectionScreenBase";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/CreateSalesforceOrganizationSyncTaskWizard";
import { taskHelper } from "components/tasks/task.helper";

export default function CreateSalesforceOrganizationSyncTaskWizardTestSalesforceSourceToolConnectionScreen({
  task,
  setTask,
  setCurrentScreen,
  salesforceToolId,
  setButtonContainer,
  flow,
}) {
  const onSuccessFunction = () => {
    setTask({...taskHelper.updateSfdcToolIdForSalesforceTask(task, salesforceToolId, flow)});
    setCurrentScreen(
      CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN,
    );
  };

  const onFailureFunction = () => {
    setCurrentScreen(
      CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN,
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

CreateSalesforceOrganizationSyncTaskWizardTestSalesforceSourceToolConnectionScreen.propTypes = {
  task: PropTypes.string,
  salesforceToolId: PropTypes.string,
  setTask: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  flow: PropTypes.string,
};

