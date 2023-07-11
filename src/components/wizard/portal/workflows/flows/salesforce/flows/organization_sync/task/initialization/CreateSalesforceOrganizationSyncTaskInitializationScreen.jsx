import React from "react";
import PropTypes from "prop-types";
import CreateWorkflowWizardTaskInitializationScreen
from "components/wizard/portal/workflows/flows/tasks/initialization/CreateWorkflowWizardTaskInitializationScreen";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS
} from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/task/CreateSalesforceOrganizationSyncTaskWizard";
import { taskTemplateIdentifierConstants } from "components/admin/task_templates/taskTemplateIdentifier.constants";
import { SalesforceTaskHelper } from "components/tasks/salesforceTask.helper";
import {getTaskTypeLabel} from "../../../../../../../../../tasks/task.types";


export default function CreateSalesforceOrganizationSyncTaskInitializationScreen(
  {
    setTask,
    setCurrentScreen,
    salesforceToolId,
    gitToolId,
    gitToolOption,
    flow,
    setButtonContainer,
    jenkinsToolId,
    gitToolModel,
    sourceSalesforceToolModel
  }) {
  const setTaskFunction = (task) => {
    const updatedTask = SalesforceTaskHelper.configureSalesforceOrganizationSyncTask(
      task,
      flow,
      salesforceToolId,
      gitToolId,
      gitToolOption,
      jenkinsToolId,
      gitToolModel,
      sourceSalesforceToolModel
    );
    setTask({...updatedTask});
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.EDIT_WORKFLOW_INPUT);
  };

  return (
    <CreateWorkflowWizardTaskInitializationScreen
      setTaskFunction={setTaskFunction}
      type={getTaskTypeLabel(flow)}
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
  jenkinsToolId: PropTypes.string,
  gitToolModel: PropTypes.object,
  sourceSalesforceToolModel: PropTypes.object
};

