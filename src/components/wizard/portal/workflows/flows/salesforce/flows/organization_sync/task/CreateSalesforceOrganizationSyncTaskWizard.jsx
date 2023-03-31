import React, { useState } from "react";
import CreateWorkflowWizardCreateGitToolScreenBase from "components/wizard/portal/workflows/flows/tools/git/CreateWorkflowWizardCreateGitToolScreenBase";
import sfdcConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/sfdc/sfdc-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import CreateWorkflowWizardCreateSalesforceToolEditorPanel from "components/wizard/portal/workflows/flows/tools/salesforce/CreateWorkflowWizardCreateSalesforceToolEditorPanel";
import * as PropType from "prop-types";
import CreateSalesforceOrganizationSyncTaskInitializationScreen from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/task/initialization/CreateSalesforceOrganizationSyncTaskInitializationScreen";
import CreateWorkflowWizardTaskCompletionScreen from "components/wizard/portal/workflows/flows/tasks/completion/CreateWorkflowWizardTaskCompletionScreen";
import CreateSalesforceOrganizationSyncTaskTestGitToolConnectionScreen from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/task/tools/git/connection/CreateSalesforceOrganizationSyncTaskTestGitToolConnectionScreen";
import CreateSalesforceWizardTestSalesforceSourceToolConnectionScreen from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/task/tools/salesforce/connection/CreateSalesforceWizardTestSalesforceSourceToolConnectionScreen";
import { salesforceWorkflowFlowConstants } from "components/wizard/portal/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateWorkflowWizardRegisterGitCredentialsInJenkinsToolScreenBase from "components/wizard/portal/workflows/flows/tools/jenkins/CreateWorkflowWizardRegisterGitCredentialsInJenkinsToolScreenBase";
import { CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES } from "../../../../tools/CreateWorkflowWizardRegisterToolHeaderText";
import CreateWorkflowWizardCreateJenkinsTool from "../../../../tools/jenkins/CreateWorkflowWizardCreateJenkinsTool";
import jenkinsConnectionMetadata from "../../../../../../../../inventory/tools/tool_details/tool_jobs/jenkins/jenkins-connection-metadata";
import CreateWorkflowWizardTestJenkinsTool from "../../../../tools/jenkins/CreateWorkflowWizardTestJenkinsTool";
import CreateSalesforceOrganizationSyncInputFields from "./CreateSalesforceOrganizationSyncInputFields";

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

export default function CreateSalesforceOrganizationSyncTaskWizard({
  flow,
  setButtonContainer,
  backButtonFunction,
  handleClose
}) {
  const [currentScreen, setCurrentScreen] = useState(
    CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_SCREEN,
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
  const [sourceJenkinsToolModel, setSourceJenkinsToolModel] = useState(
    modelHelpers.getNewModelForMetadata(jenkinsConnectionMetadata),
  );
  const [jenkinsSourceToolId, setJenkinsSourceToolId] = useState(undefined);
  const [connectionFailure, setConnectionFailure] = useState(false);
  const [failureCount, setConnectionFailureCount] = useState(0);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_SCREEN:
        return (
          <CreateWorkflowWizardCreateGitToolScreenBase
            gitToolModel={gitToolModel}
            setGitToolModel={setGitToolModel}
            onSuccessFunction={() =>
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN,
              )
            }
            setGitToolId={setGitToolId}
            gitToolOption={gitToolOption}
            setGitToolOption={setGitToolOption}
            gitToolId={gitToolId}
            className={"m-3"}
            setButtonContainer={setButtonContainer}
            backButtonFunction={backButtonFunction}
            toolType={CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES.SOURCE}
            connectionFailure={connectionFailure}
            setConnectionFailure={setConnectionFailure}
            onSkipConnectionTestFunction={() => {
              setConnectionFailure(false);
              setConnectionFailureCount(connectionFailure + 1);
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_SALESFORCE_ACCOUNT_SCREEN,
              );
            }}
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
            setConnectionFailure={setConnectionFailure}
          />
        );
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
                CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_SCREEN,
              )
            }
            connectionFailure={connectionFailure}
            setConnectionFailure={setConnectionFailure}
            setCurrentScreen={setCurrentScreen}
            onSkipConnectionTestFunction={() => {
              setConnectionFailure(false);
              setConnectionFailureCount(connectionFailure + 1);
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_JENKINS_ACCOUNT_SCREEN,
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
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_JENKINS_ACCOUNT_SCREEN:
        return (
          <CreateWorkflowWizardCreateJenkinsTool
            jenkinsToolModel={sourceJenkinsToolModel}
            setJenkinsToolModel={setSourceJenkinsToolModel}
            jenkinsToolId={jenkinsSourceToolId}
            setJenkinsToolId={setJenkinsSourceToolId}
            onSuccessFunction={() =>
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_JENKINS_ACCOUNT_SCREEN,
              )
            }
            toolType={CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES.BUILD}
            className={"m-3"}
            setButtonContainer={setButtonContainer}
            backButtonFunction={() =>
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_SCREEN,
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
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_JENKINS_ACCOUNT_SCREEN:
        return (
          <CreateWorkflowWizardTestJenkinsTool
            setCurrentScreen={setCurrentScreen}
            jenkinsToolId={jenkinsSourceToolId}
            setButtonContainer={setButtonContainer}
            setConnectionFailure={setConnectionFailure}
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
            jenkinsToolId={jenkinsSourceToolId}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_IN_JENKINS_SCREEN:
        return (
          <CreateWorkflowWizardRegisterGitCredentialsInJenkinsToolScreenBase
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            onSuccessFunction={() =>
              setCurrentScreen(
                CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.EDIT_WORKFLOW_INPUT,
              )
            }
            onFailureFunction={() => {}}
            jenkinsToolId={jenkinsSourceToolId}
            className={"m-3"}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.EDIT_WORKFLOW_INPUT:
        return (
            <CreateSalesforceOrganizationSyncInputFields
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
            connectionFailure={failureCount}
          />
        );
    }
  };

  return <div>{getCurrentScreen()}</div>;
}

CreateSalesforceOrganizationSyncTaskWizard.propTypes = {
  flow: PropType.string,
  setButtonContainer: PropType.func,
  backButtonFunction: PropType.func,
  handleClose: PropType.func,
};
