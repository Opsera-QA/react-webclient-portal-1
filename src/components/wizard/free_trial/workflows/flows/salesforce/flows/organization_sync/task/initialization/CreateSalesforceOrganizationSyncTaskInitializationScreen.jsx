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
import {
  taskTemplateIdentifierConstants
} from "../../../../../../../../../admin/task_templates/taskTemplateIdentifier.constants";

export default function CreateSalesforceOrganizationSyncTaskInitializationScreen(
  {
    setTask,
    setCurrentScreen,
    flow,
  }) {
  const getTaskName = (flow) => {
    switch (flow) {
      case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC :
        return salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC;
      case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK :
        return salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC_TASK;
      default :
        return "Salesforce Task";
    }
  };

  const getTemplateIdentifier = (flow) => {
    switch (flow) {
      case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC :
        return taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS.FREE_TRIAL_SALESFORCE_TO_GIT_MERGE_SYNC_TASK;
      case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK :
        return taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS.FREE_TRIAL_ORGANIZATION_SYNC_TASK;
      default :
        console.error("Not a valid task flow ", flow);
        return "Not a valid task flow";
    }
  };

  const setTaskFunction = (task) => {
    let taskName = getTaskName(flow);
    setTask({...task, name: taskName + " [Free Trial]"});
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN);
  };

  return (
    <CreateWorkflowWizardTaskInitializationScreen
      setTaskFunction={setTaskFunction}
      type={salesforceWorkflowFlowConstants.getLabelForSalesforceFlow(flow)}
      templateIdentifier={getTemplateIdentifier(flow)}
    />
  );
}

CreateSalesforceOrganizationSyncTaskInitializationScreen.propTypes = {
  setTask: PropTypes.func,
  flow: PropTypes.string,
  setCurrentScreen: PropTypes.func,
};

