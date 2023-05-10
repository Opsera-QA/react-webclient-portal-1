import React, { useState } from "react";
import CreateWorkflowWizardCreateGitToolScreenBase from "components/wizard/portal/workflows/flows/tools/git/CreateWorkflowWizardCreateGitToolScreenBase";
import sfdcConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/sfdc/sfdc-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import CreateWorkflowWizardCreateSalesforceToolEditorPanel from "components/wizard/portal/workflows/flows/tools/salesforce/CreateWorkflowWizardCreateSalesforceToolEditorPanel";
import * as PropType from "prop-types";
import CreateWorkflowWizardTaskCompletionScreen from "components/wizard/portal/workflows/flows/tasks/completion/CreateWorkflowWizardTaskCompletionScreen";
import { salesforceWorkflowFlowConstants } from "components/wizard/portal/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateSalesforceOrganizationToGitMergeSyncTaskInitializationScreen from "./initialization/CreateSalesforceOrganizationToGitMergeSyncTaskInitializationScreen";
import CreateSalesforceOrganizationToGitMergeSyncTaskTestGitToolConnectionScreen from "./tools/git/connection/CreateSalesforceOrganizationToGitMergeSyncTaskTestGitToolConnectionScreen";
import CreateSalesforceOrganizationToGitMergeSyncTaskWizardTestSalesforceSourceToolConnectionScreen from "./tools/salesforce/connection/CreateSalesforceOrganizationToGitMergeSyncTaskWizardTestSalesforceSourceToolConnectionScreen";
import { CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES } from "components/wizard/portal/workflows/flows/tools/CreateWorkflowWizardRegisterToolHeaderText";
import { CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS } from "../../salesforce_quick_deploy/CreateSalesforceQuickDeployTask";
import SalesforceToGitMergeSyncInputFields from "./cards/SalesforceToGitMergeSyncInputFields";
import { getTaskTypeLabel } from "components/tasks/task.types";

export const CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS =
  {
    REGISTER_SOURCE_SALESFORCE_ACCOUNT_SCREEN:
      "register_source_salesforce_tool_screen",
    TEST_SOURCE_SALESFORCE_ACCOUNT_SCREEN:
      "test_source_salesforce_tool_account_screen",
    REGISTER_DESTINATION_GIT_ACCOUNT_SCREEN:
      "register_destination_git_account_screen",
    TEST_DESTINATION_GIT_ACCOUNT_CONNECTION_SCREEN:
      "test_destination_git_account_connection_screen",
    INITIALIZATION_SCREEN: "initialization_screen",
    WORKFLOW_COMPLETION_SCREEN: "workflow_completion_screen",
    EDIT_WORKFLOW_INPUT: "edit_workflow_input",
  };

export default function CreateSalesforceOrganizationToGitMergeSyncTaskWizard({
  flow,
  backButtonFunction,
  setButtonContainer,
  handleClose,
}) {
  const [currentScreen, setCurrentScreen] = useState(
    CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.REGISTER_SOURCE_SALESFORCE_ACCOUNT_SCREEN,
  );
  const [task, setTask] = useState(undefined);
  const [gitToolModel, setGitToolModel] = useState(undefined);
  const [gitToolOption, setGitToolOption] = useState(undefined);
  const [gitToolId, setGitToolId] = useState(undefined);
  const [sourceSalesforceToolModel, setSourceSalesforceToolModel] = useState(
    modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata),
  );
  const [salesforceSourceToolId, setSalesforceSourceToolId] =
    useState(undefined);
  const [connectionFailure, setConnectionFailure] = useState(false);
  const [failureCount, setConnectionFailureCount] = useState(0);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.REGISTER_SOURCE_SALESFORCE_ACCOUNT_SCREEN:
        return (
          <CreateWorkflowWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={sourceSalesforceToolModel}
            setSalesforceToolModel={setSourceSalesforceToolModel}
            salesforceToolId={salesforceSourceToolId}
            setSalesforceToolId={setSalesforceSourceToolId}
            onSuccessFunction={() =>
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_ACCOUNT_SCREEN,
              )
            }
            toolType={CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES.SOURCE}
            className={"m-3"}
            backButtonFunction={backButtonFunction}
            setButtonContainer={setButtonContainer}
            connectionFailure={connectionFailure}
            onSkipConnectionTestFunction={() => {
              setConnectionFailure(false);
              setConnectionFailureCount(connectionFailure + 1);
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.REGISTER_DESTINATION_GIT_ACCOUNT_SCREEN,
              );
            }}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_ACCOUNT_SCREEN:
        return (
          <CreateSalesforceOrganizationToGitMergeSyncTaskWizardTestSalesforceSourceToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={salesforceSourceToolId}
            setButtonContainer={setButtonContainer}
            setConnectionFailure={setConnectionFailure}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.REGISTER_DESTINATION_GIT_ACCOUNT_SCREEN:
        return (
          <CreateWorkflowWizardCreateGitToolScreenBase
            gitToolModel={gitToolModel}
            setGitToolModel={setGitToolModel}
            onSuccessFunction={() =>
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.TEST_DESTINATION_GIT_ACCOUNT_CONNECTION_SCREEN,
              )
            }
            setGitToolId={setGitToolId}
            gitToolOption={gitToolOption}
            setGitToolOption={setGitToolOption}
            gitToolId={gitToolId}
            className={"m-3"}
            backButtonFunction={() =>
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.REGISTER_SOURCE_SALESFORCE_ACCOUNT_SCREEN,
              )
            }
            setButtonContainer={setButtonContainer}
            connectionFailure={connectionFailure}
            onSkipConnectionTestFunction={() => {
              setConnectionFailure(false);
              setConnectionFailureCount(connectionFailure + 1);
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.INITIALIZATION_SCREEN,
              );
            }}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.TEST_DESTINATION_GIT_ACCOUNT_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationToGitMergeSyncTaskTestGitToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            setButtonContainer={setButtonContainer}
            setConnectionFailure={setConnectionFailure}
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
      case CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.EDIT_WORKFLOW_INPUT:
        return (
          <SalesforceToGitMergeSyncInputFields
            taskModel={task}
            setTaskModel={setTask}
            onSuccessFunction={() =>
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN,
              )
            }
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN:
        return (
          <CreateWorkflowWizardTaskCompletionScreen
            task={task}
            workflowType={getTaskTypeLabel(
                flow,
            )}
            flow={flow}
            setButtonContainer={setButtonContainer}
            connectionFailure={failureCount}
            handleClose={handleClose}
          />
        );
    }
  };

  return <div>{getCurrentScreen()}</div>;
}

CreateSalesforceOrganizationToGitMergeSyncTaskWizard.propTypes = {
  flow: PropType.string,
  setButtonContainer: PropType.func,
  backButtonFunction: PropType.func,
  handleClose: PropType.func,
};
