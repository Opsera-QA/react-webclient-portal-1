import React from "react";
import PropTypes from "prop-types";
import WorkflowWizardToolConnectionScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/test_connection/WorkflowWizardToolConnectionScreenBase";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/CreateSalesforceOrganizationSyncTaskWizard";

export default function CreateSalesforceOrganizationSyncTaskWizardTestSalesforceDestinationToolConnectionScreen(
  {
    task,
    setTask,
    setCurrentScreen,
    salesforceToolId,
  }) {
  const onSuccessFunction = () => {
    task.configuration.sfdcToolId = salesforceToolId;
    setTask({...task});
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN);
  };

  const onFailureFunction = () => {
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN);
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

CreateSalesforceOrganizationSyncTaskWizardTestSalesforceDestinationToolConnectionScreen.propTypes = {
  task: PropTypes.string,
  setTask: PropTypes.func,
  salesforceToolId: PropTypes.string,
  setCurrentScreen: PropTypes.func,
};

