import React from "react";
import PropTypes from "prop-types";
import {
  salesforceWorkflowFlowConstants
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateWorkflowWizardTaskInitializationScreen
  from "components/wizard/free_trial/workflows/flows/tasks/initialization/CreateWorkflowWizardTaskInitializationScreen";
import {
  taskTemplateIdentifierConstants
} from "components/admin/task_templates/taskTemplateIdentifier.constants";
import {
  CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS
} from "../CreateSalesforceOrganizationToGitMergeSyncTaskWizard";

export default function CreateSalesforceOrganizationToGitMergeSyncTaskInitializationScreen(
  {
    setTask,
    setCurrentScreen,
    flow,
  }) {

  const setTaskFunction = (task) => {
    setTask({...task, name: salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC + " [Free Trial]"});
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN);
  };

  return (
    <CreateWorkflowWizardTaskInitializationScreen
      setTaskFunction={setTaskFunction}
      type={salesforceWorkflowFlowConstants.getLabelForSalesforceFlow(flow)}
      templateIdentifier={taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS.FREE_TRIAL_SALESFORCE_TO_GIT_MERGE_SYNC_TASK}
    />
  );
}

CreateSalesforceOrganizationToGitMergeSyncTaskInitializationScreen.propTypes = {
  setTask: PropTypes.func,
  flow: PropTypes.string,
  setCurrentScreen: PropTypes.func,
};

