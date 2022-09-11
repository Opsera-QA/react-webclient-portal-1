import React, {useState} from "react";
import CreateWorkflowWizardCreateGitToolScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/git/CreateWorkflowWizardCreateGitToolScreenBase";
import sfdcConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/sfdc/sfdc-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import CreateWorkflowWizardCreateSalesforceToolEditorPanel
  from "components/wizard/free_trial/workflows/flows/tools/salesforce/CreateWorkflowWizardCreateSalesforceToolEditorPanel";
import * as PropType from "prop-types";
import CreateSalesforceOrganizationSyncTaskInitializationScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/initialization/CreateSalesforceOrganizationSyncTaskInitializationScreen";
import CreateWorkflowWizardTaskCompletionScreen
  from "components/wizard/free_trial/workflows/flows/tasks/completion/CreateWorkflowWizardTaskCompletionScreen";
import CreateSalesforceOrganizationSyncTaskTestGitToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/tools/git/connection/CreateSalesforceOrganizationSyncTaskTestGitToolConnectionScreen";
import CreateSalesforceOrganizationSyncTaskWizardTestSalesforceSourceToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/tools/salesforce/connection/CreateSalesforceOrganizationSyncTaskWizardTestSalesforceSourceToolConnectionScreen";
import {
  salesforceWorkflowFlowConstants
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateWorkflowWizardRegisterGitCredentialsInJenkinsToolScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/jenkins/CreateWorkflowWizardRegisterGitCredentialsInJenkinsToolScreenBase";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";

export const CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS = {
  REGISTER_GIT_ACCOUNT_SCREEN: "create_git_tool_screen",
  TEST_GIT_TOOL_CONNECTION_SCREEN: "test_git_tool_connection_screen",
  REGISTER_SALESFORCE_ACCOUNT_SCREEN: "create_source_salesforce_tool_screen",
  TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN: "test_source_salesforce_tool_connection_screen",
  INITIALIZATION_SCREEN: "initialization_screen",
  REGISTER_GIT_ACCOUNT_IN_JENKINS_SCREEN: "register_git_account_in_jenkins_screen",
  WORKFLOW_COMPLETION_SCREEN: "workflow_completion_screen",
};

export default function CreateSalesforceOrganizationSyncTaskWizard(
  {
    flow,
    setButtonContainer,
    backButtonFunction,
  }) {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_SCREEN);
  const [task, setTask] = useState(undefined);
  const [gitToolModel, setGitToolModel] = useState(undefined);
  const [gitToolOption, setGitToolOption] = useState(undefined);
  const [gitToolId, setGitToolId] = useState(undefined);
  const [sourceSalesforceToolModel, setSourceSalesforceToolModel] = useState(modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata));
  const [salesforceSourceToolId, setSalesforceSourceToolId] = useState(undefined);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_SCREEN:
        return (
          <CreateWorkflowWizardCreateGitToolScreenBase
            gitToolModel={gitToolModel}
            setGitToolModel={setGitToolModel}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN)}
            setGitToolId={setGitToolId}
            gitToolOption={gitToolOption}
            setGitToolOption={setGitToolOption}
            gitToolId={gitToolId}
            className={"m-3"}
            setButtonContainer={setButtonContainer}
            backButtonFunction={backButtonFunction}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncTaskTestGitToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            flow={flow}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_SALESFORCE_ACCOUNT_SCREEN:
        return (
          <CreateWorkflowWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={sourceSalesforceToolModel}
            setSalesforceToolModel={setSourceSalesforceToolModel}
            salesforceToolId={salesforceSourceToolId}
            setSalesforceToolId={setSalesforceSourceToolId}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN)}
            className={"m-3"}
            setButtonContainer={setButtonContainer}
            backButtonFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_SCREEN)}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncTaskWizardTestSalesforceSourceToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={salesforceSourceToolId}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncTaskInitializationScreen
            setTask={setTask}
            flow={flow}
            setCurrentScreen={setCurrentScreen}
            setButtonContainer={setButtonContainer}
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            salesforceToolId={salesforceSourceToolId}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_IN_JENKINS_SCREEN:
        return (
          <CreateWorkflowWizardRegisterGitCredentialsInJenkinsToolScreenBase
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN)}
            onFailureFunction={() => {}}
            jenkinsToolId={salesforcePipelineHelper.getJenkinsIdFromSalesforceTask(
              task,
            )}
            className={"m-3"}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN:
        return (
          <CreateWorkflowWizardTaskCompletionScreen
            task={task}
            workflowType={salesforceWorkflowFlowConstants.getLabelForSalesforceFlow(flow)}
            flow={flow}
            setButtonContainer={setButtonContainer}
          />
        );
    }
  };

  return (
    <div>
      {getCurrentScreen()}
    </div>
  );
}

CreateSalesforceOrganizationSyncTaskWizard.propTypes = {
  flow: PropType.string,
  setButtonContainer: PropType.func,
  backButtonFunction: PropType.func,
};

