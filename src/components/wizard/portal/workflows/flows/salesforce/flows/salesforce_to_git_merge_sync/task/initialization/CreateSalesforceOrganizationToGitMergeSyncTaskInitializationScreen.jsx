import React from "react";
import PropTypes from "prop-types";
import {
  salesforceWorkflowFlowConstants
} from "components/wizard/portal/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateWorkflowWizardTaskInitializationScreen
  from "components/wizard/portal/workflows/flows/tasks/initialization/CreateWorkflowWizardTaskInitializationScreen";
import {
  taskTemplateIdentifierConstants
} from "components/admin/task_templates/taskTemplateIdentifier.constants";
import {
  CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS
} from "../CreateSalesforceOrganizationToGitMergeSyncTaskWizard";
import { SalesforceTaskHelper } from "components/tasks/salesforceTask.helper";
import {getTaskTypeLabel} from "../../../../../../../../../tasks/task.types";

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
      salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC,
      salesforceToolId,
      gitToolId,
      gitToolOption
    );
    setTask({...updatedTask});
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.EDIT_WORKFLOW_INPUT);
  };

  return (
    <CreateWorkflowWizardTaskInitializationScreen
      setTaskFunction={setTaskFunction}
      type={getTaskTypeLabel(flow)}
      templateIdentifier={taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS.SALESFORCE_TO_GIT_MERGE_SYNC_TASK}
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

