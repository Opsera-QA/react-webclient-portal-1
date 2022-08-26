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
import {
  taskTemplateIdentifierConstants
} from "../../../../../../../../../admin/task_templates/taskTemplateIdentifier.constants";

export default function CreateSalesforceOrganizationSyncTaskInitializationScreen(
  {
    setTask,
    setCurrentScreen,
    flow,
  }) {
  const setTaskFunction = (task) => {
    setTask({...task, name: salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC_TASK + " [Free Trial]"});
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN);
  };

  return (
    <CreateWorkflowWizardTaskInitializationScreen
      setTaskFunction={setTaskFunction}
      type={salesforceWorkflowFlowConstants.getLabelForSalesforceFlow(flow)}
      templateIdentifier={taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS.FREE_TRIAL_ORGANIZATION_SYNC_TASK}
    />
  );
}

CreateSalesforceOrganizationSyncTaskInitializationScreen.propTypes = {
  setTask: PropTypes.func,
  flow: PropTypes.string,
  setCurrentScreen: PropTypes.func,
};

