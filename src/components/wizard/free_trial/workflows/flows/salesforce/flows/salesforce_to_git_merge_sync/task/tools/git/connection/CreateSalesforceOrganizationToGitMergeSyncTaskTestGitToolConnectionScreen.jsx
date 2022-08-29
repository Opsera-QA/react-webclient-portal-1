import React from "react";
import PropTypes from "prop-types";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";
import CreateWorkflowWizardTestGitToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/tools/git/CreateWorkflowWizardTestGitToolConnectionScreen";
import { taskHelper } from "components/tasks/task.helper";
import {
  CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS
} from "../../../CreateSalesforceOrganizationToGitMergeSyncTaskWizard";

export default function CreateSalesforceOrganizationToGitMergeSyncTaskTestGitToolConnectionScreen({
  task,
  setTask,
  setCurrentScreen,
  gitToolId,
  gitToolOption,
  flow,
}) {
  const onSuccessFunction = () => {
    setTask({...taskHelper.updateGitToolIdForSalesforceTask(task, gitToolId, gitToolOption, flow)});
    setCurrentScreen(
        CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN,
    );
  };

  const onFailureFunction = () => {
    setCurrentScreen(
        CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN,
    );
  };

  return (
    <CreateWorkflowWizardTestGitToolConnectionScreen
      setCurrentScreen={setCurrentScreen}
      gitToolId={gitToolId}
      gitToolOption={gitToolOption}
      onSuccessFunction={onSuccessFunction}
      onFailureFunction={onFailureFunction}
      jenkinsToolId={salesforcePipelineHelper.getJenkinsIdFromSalesforceTask(task)}
      flow={flow}
      className={"m-3"}
    />
  );
}

CreateSalesforceOrganizationToGitMergeSyncTaskTestGitToolConnectionScreen.propTypes = {
  task: PropTypes.string,
  gitToolId: PropTypes.string,
  gitToolOption: PropTypes.string,
  setTask: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  flow: PropTypes.string,
};

