import React, { useState } from "react";
import modelHelpers from "components/common/model/modelHelpers";
import * as PropType from "prop-types";
import CreateWorkflowWizardTaskCompletionScreen from "components/wizard/portal/workflows/flows/tasks/completion/CreateWorkflowWizardTaskCompletionScreen";
import { salesforceWorkflowFlowConstants } from "components/wizard/portal/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import { CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES } from "../../../tools/CreateWorkflowWizardRegisterToolHeaderText";
import CreateWorkflowWizardCreateSalesforceToolEditorPanel from "../../../tools/salesforce/CreateWorkflowWizardCreateSalesforceToolEditorPanel";
import CreateSalesforceWizardTestSalesforceSourceToolConnectionScreen from "../organization_sync/task/tools/salesforce/connection/CreateSalesforceWizardTestSalesforceSourceToolConnectionScreen";
import sfdcConnectionMetadata from "../../../../../../../inventory/tools/tool_details/tool_jobs/sfdc/sfdc-connection-metadata";
import CreateSalesforceQuickDeployTaskInitializationScreen from "./CreateSalesforceQuickDeployTaskInitializationScreen";
import CreateSalesforceBulkMigrationInputFields
  from "../salesforce_bulk_migration/CreateSalesforceBulkMigrationInputFields";
import CreateSalesforceQuickDeployInputFields from "./CreateSalesforceQuickDeployInputFields";

export const CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS = {
  REGISTER_GIT_ACCOUNT_SCREEN: "create_git_tool_screen",
  TEST_GIT_TOOL_CONNECTION_SCREEN: "test_git_tool_connection_screen",
  REGISTER_SALESFORCE_ACCOUNT_SCREEN: "create_source_salesforce_tool_screen",
  TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN:
    "test_source_salesforce_tool_connection_screen",
  REGISTER_JENKINS_ACCOUNT_SCREEN: "create_jenkins_account_screen",
  TEST_JENKINS_ACCOUNT_SCREEN: "test_jenkins_account_screen",
  INITIALIZATION_SCREEN: "initialization_screen",
  REGISTER_GIT_ACCOUNT_IN_JENKINS_SCREEN:
    "register_git_account_in_jenkins_screen",
  WORKFLOW_COMPLETION_SCREEN: "workflow_completion_screen",
  EDIT_WORKFLOW_INPUT: "edit_workflow_input"
};

export default function CreateSalesforceQuickDeployTask({
  flow,
  setButtonContainer,
  backButtonFunction,
  handleClose,
}) {
  const [currentScreen, setCurrentScreen] = useState(
    CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_SALESFORCE_ACCOUNT_SCREEN,
  );
  const [task, setTask] = useState(undefined);
  const [sourceSalesforceToolModel, setSourceSalesforceToolModel] = useState(
    modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata),
  );
  const [salesforceSourceToolId, setSalesforceSourceToolId] =
    useState(undefined);
  const [connectionFailure, setConnectionFailure] = useState(false);
  const [failureCount, setConnectionFailureCount] = useState(0);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_SALESFORCE_ACCOUNT_SCREEN:
        return (
          <CreateWorkflowWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={sourceSalesforceToolModel}
            setSalesforceToolModel={setSourceSalesforceToolModel}
            salesforceToolId={salesforceSourceToolId}
            setSalesforceToolId={setSalesforceSourceToolId}
            onSuccessFunction={() =>
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN,
              )
            }
            toolType={CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES.SOURCE}
            className={"m-3"}
            setButtonContainer={setButtonContainer}
            backButtonFunction={() =>
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_SALESFORCE_ACCOUNT_SCREEN,
              )
            }
            connectionFailure={connectionFailure}
            setConnectionFailure={setConnectionFailure}
            setCurrentScreen={setCurrentScreen}
            onSkipConnectionTestFunction={() => {
              setConnectionFailure(false);
              setConnectionFailureCount(connectionFailure + 1);
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.INITIALIZATION_SCREEN,
              );
            }}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceWizardTestSalesforceSourceToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={salesforceSourceToolId}
            setButtonContainer={setButtonContainer}
            setConnectionFailure={setConnectionFailure}
            flow={flow}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return (
          <CreateSalesforceQuickDeployTaskInitializationScreen
            setTask={setTask}
            flow={flow}
            setCurrentScreen={setCurrentScreen}
            setButtonContainer={setButtonContainer}
            salesforceToolId={salesforceSourceToolId}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.EDIT_WORKFLOW_INPUT:
        return (
            <CreateSalesforceQuickDeployInputFields
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
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN:
        return (
          <CreateWorkflowWizardTaskCompletionScreen
            task={task}
            workflowType={salesforceWorkflowFlowConstants.getLabelForSalesforceFlow(
              flow,
            )}
            flow={flow}
            setButtonContainer={setButtonContainer}
            handleClose={handleClose}
          />
        );
    }
  };

  return <div>{getCurrentScreen()}</div>;
}

CreateSalesforceQuickDeployTask.propTypes = {
  flow: PropType.string,
  setButtonContainer: PropType.func,
  backButtonFunction: PropType.func,
  handleClose: PropType.func,
};
