import React from "react";
import PropTypes from "prop-types";
import {
  salesforceWorkflowFlowConstants
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateWorkflowWizardTaskInitializationScreen
  from "components/wizard/free_trial/workflows/flows/tasks/CreateWorkflowWizardTaskInitializationScreen";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/CreateSalesforceOrganizationSyncTaskWizard";

export default function CreateSalesforceOrganizationSyncTaskInitializationScreen(
  {
    setTask,
    setCurrentScreen,
    flow,
  }) {
  const setTaskFunction = (task) => {
    setTask({...task});
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN);
  };

  return (
    <CreateWorkflowWizardTaskInitializationScreen
      setTaskFunction={setTaskFunction}
      type={salesforceWorkflowFlowConstants.getLabelForSalesforceFlow(flow)}
      templateIdentifier={"test"}
    />
  );
}

CreateSalesforceOrganizationSyncTaskInitializationScreen.propTypes = {
  setTask: PropTypes.func,
  flow: PropTypes.string,
  setCurrentScreen: PropTypes.func,
};

