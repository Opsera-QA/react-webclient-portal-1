import React from "react";
import PropTypes from "prop-types";
import {
  salesforceWorkflowFlowConstants
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateWorkflowWizardTaskInitializationScreen
  from "components/wizard/free_trial/workflows/flows/tasks/initialization/CreateWorkflowWizardTaskInitializationScreen";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/CreateSalesforceOrganizationSyncTaskWizard";
import { taskTemplateIdentifierConstants } from "components/admin/task_templates/taskTemplateIdentifier.constants";
import { taskHelper } from "components/tasks/task.helper";

export default function CreateSalesforceOrganizationSyncTaskInitializationScreen(
  {
    setTask,
    setCurrentScreen,
    salesforceToolId,
    gitToolId,
    gitToolOption,
    flow,
    setButtonContainer,
  }) {
  const setTaskFunction = (task) => {
    let updatedTask = taskHelper.configureSalesforceOrganizationSyncTask(
      task,
      flow,
      salesforceToolId,
      gitToolId,
      gitToolOption
    );
    setTask({...updatedTask});
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_IN_JENKINS_SCREEN);
  };

  return (
    <CreateWorkflowWizardTaskInitializationScreen
      setTaskFunction={setTaskFunction}
      type={salesforceWorkflowFlowConstants.getLabelForSalesforceFlow(flow)}
      templateIdentifier={taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS.FREE_TRIAL_ORGANIZATION_SYNC_TASK}
      setButtonContainer={setButtonContainer}
    />
  );
}

CreateSalesforceOrganizationSyncTaskInitializationScreen.propTypes = {
  setTask: PropTypes.func,
  flow: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  salesforceToolId: PropTypes.string,
  gitToolId: PropTypes.string,
  gitToolOption: PropTypes.string,
};

