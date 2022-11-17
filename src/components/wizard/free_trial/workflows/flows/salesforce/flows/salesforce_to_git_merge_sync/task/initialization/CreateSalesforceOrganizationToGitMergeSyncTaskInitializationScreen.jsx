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
import { SalesforceTaskHelper } from "components/tasks/salesforceTask.helper";

export default function CreateSalesforceOrganizationToGitMergeSyncTaskInitializationScreen(
  {
    setTask,
    setCurrentScreen,
    flow,
    setButtonContainer,
    gitToolId,
    gitToolOption,
    salesforceToolId,
  }) {

  const setTaskFunction = (task) => {
    const updatedTask = SalesforceTaskHelper.configureSalesforceToGitMergeSyncTask(
      task,
      flow,
      salesforceToolId,
      gitToolId,
      gitToolOption
    );
    setTask({...updatedTask});
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN);
  };

  return (
    <CreateWorkflowWizardTaskInitializationScreen
      setTaskFunction={setTaskFunction}
      type={salesforceWorkflowFlowConstants.getLabelForSalesforceFlow(flow)}
      templateIdentifier={taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS.FREE_TRIAL_SALESFORCE_TO_GIT_MERGE_SYNC_TASK}
      setButtonContainer={setButtonContainer}
    />
  );
}

CreateSalesforceOrganizationToGitMergeSyncTaskInitializationScreen.propTypes = {
  setTask: PropTypes.func,
  flow: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  gitToolId: PropTypes.string,
  gitToolOption: PropTypes.string,
  salesforceToolId: PropTypes.string,
};

