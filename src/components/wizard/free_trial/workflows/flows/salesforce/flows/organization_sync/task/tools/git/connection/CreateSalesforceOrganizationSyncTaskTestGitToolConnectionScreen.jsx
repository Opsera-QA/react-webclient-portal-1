import React from "react";
import PropTypes from "prop-types";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";
import CreateWorkflowWizardTestGitToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/tools/git/CreateWorkflowWizardTestGitToolConnectionScreen";
import {
  CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/CreateSalesforceOrganizationSyncTaskWizard";

export default function CreateSalesforceOrganizationSyncTaskTestGitToolConnectionScreen(
  {
    task,
    setTask,
    setCurrentScreen,
    gitToolId,
    gitToolOption,
  }) {
  const onSuccessFunction = () => {
    task.configuration.gitToolId = gitToolId;
    task.configuration.service = gitToolOption;
    setTask({...task});
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN);
  };

  const onFailureFunction = () => {
    setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN);
  };

  return (
    <CreateWorkflowWizardTestGitToolConnectionScreen
      setCurrentScreen={setCurrentScreen}
      gitToolId={gitToolId}
      gitToolOption={gitToolOption}
      onSuccessFunction={onSuccessFunction}
      onFailureFunction={onFailureFunction}
      jenkinsToolId={salesforcePipelineHelper.getJenkinsIdFromSalesforceTask(task)}
      className={"m-3"}
    />
  );
}

CreateSalesforceOrganizationSyncTaskTestGitToolConnectionScreen.propTypes = {
  task: PropTypes.string,
  gitToolId: PropTypes.string,
  gitToolOption: PropTypes.string,
  setTask: PropTypes.func,
  setCurrentScreen: PropTypes.func,
};

