import React, {useState} from "react";
import CreateWorkflowWizardCreateGitToolScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/git/CreateWorkflowWizardCreateGitToolScreenBase";
import sfdcConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/sfdc/sfdc-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import CreateWorkflowWizardCreateSalesforceToolEditorPanel
  from "components/wizard/free_trial/workflows/flows/tools/salesforce/CreateWorkflowWizardCreateSalesforceToolEditorPanel";
import * as PropType from "prop-types";
import CreateWorkflowWizardTaskCompletionScreen
  from "components/wizard/free_trial/workflows/flows/tasks/completion/CreateWorkflowWizardTaskCompletionScreen";
import {
  salesforceWorkflowFlowConstants
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateSalesforceOrganizationToGitMergeSyncTaskInitializationScreen
  from "./initialization/CreateSalesforceOrganizationToGitMergeSyncTaskInitializationScreen";
import CreateSalesforceOrganizationToGitMergeSyncTaskTestGitToolConnectionScreen
  from "./tools/git/connection/CreateSalesforceOrganizationToGitMergeSyncTaskTestGitToolConnectionScreen";
import CreateSalesforceOrganizationToGitMergeSyncTaskWizardTestSalesforceSourceToolConnectionScreen
  from "./tools/salesforce/connection/CreateSalesforceOrganizationToGitMergeSyncTaskWizardTestSalesforceSourceToolConnectionScreen";

export const CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS = {
  INITIALIZATION_SCREEN: "initialization_screen",
  REGISTER_GIT_ACCOUNT_SCREEN: "create_git_tool_screen",
  TEST_GIT_TOOL_CONNECTION_SCREEN: "test_git_tool_connection_screen",
  REGISTER_SALESFORCE_ACCOUNT_SCREEN: "create_source_salesforce_tool_screen",
  TEST_SALESFORCE_TOOL_CONNECTION_SCREEN: "test_source_salesforce_tool_connection_screen",
  WORKFLOW_COMPLETION_SCREEN: "workflow_completion_screen",
};

export default function CreateSalesforceOrganizationToGitMergeSyncTaskWizard(
  {
    flow,
    backButtonFunction,
    setButtonContainer,
  }) {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_SCREEN);
  const [task, setTask] = useState(undefined);
  const [gitToolModel, setGitToolModel] = useState(undefined);
  const [gitToolOption, setGitToolOption] = useState(undefined);
  const [gitToolId, setGitToolId] = useState(undefined);
  const [sourceSalesforceToolModel, setSourceSalesforceToolModel] = useState(modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata));
  const [salesforceSourceToolId, setSalesforceSourceToolId] = useState(undefined);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_SCREEN:
        return (
          <CreateWorkflowWizardCreateGitToolScreenBase
            gitToolModel={gitToolModel}
            setGitToolModel={setGitToolModel}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN)}
            setGitToolId={setGitToolId}
            gitToolOption={gitToolOption}
            setGitToolOption={setGitToolOption}
            gitToolId={gitToolId}
            className={"m-3"}
            backButtonFunction={backButtonFunction}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationToGitMergeSyncTaskTestGitToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.REGISTER_SALESFORCE_ACCOUNT_SCREEN:
        return (
          <CreateWorkflowWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={sourceSalesforceToolModel}
            setSalesforceToolModel={setSourceSalesforceToolModel}
            salesforceToolId={salesforceSourceToolId}
            setSalesforceToolId={setSalesforceSourceToolId}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.TEST_SALESFORCE_TOOL_CONNECTION_SCREEN)}
            type={"source"}
            className={"m-3"}
            backButtonFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_SCREEN)}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.TEST_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationToGitMergeSyncTaskWizardTestSalesforceSourceToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={salesforceSourceToolId}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return (
          <CreateSalesforceOrganizationToGitMergeSyncTaskInitializationScreen
            setTask={setTask}
            flow={flow}
            setCurrentScreen={setCurrentScreen}
            setButtonContainer={setButtonContainer}
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            salesforceToolId={salesforceSourceToolId}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN:
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

CreateSalesforceOrganizationToGitMergeSyncTaskWizard.propTypes = {
  flow: PropType.string,
  setButtonContainer: PropType.func,
  backButtonFunction: PropType.func,
};

