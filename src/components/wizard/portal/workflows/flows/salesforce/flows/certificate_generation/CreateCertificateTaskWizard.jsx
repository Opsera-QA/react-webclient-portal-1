import React, { useState } from "react";
import modelHelpers from "components/common/model/modelHelpers";
import * as PropType from "prop-types";
import CreateWorkflowWizardTaskCompletionScreen from "components/wizard/portal/workflows/flows/tasks/completion/CreateWorkflowWizardTaskCompletionScreen";
import { salesforceWorkflowFlowConstants } from "components/wizard/portal/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import { CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES } from "../../../tools/CreateWorkflowWizardRegisterToolHeaderText";
import CreateWorkflowWizardCreateJenkinsTool from "../../../tools/jenkins/CreateWorkflowWizardCreateJenkinsTool";
import jenkinsConnectionMetadata from "../../../../../../../inventory/tools/tool_details/tool_jobs/jenkins/jenkins-connection-metadata";
import CreateWorkflowWizardTestJenkinsTool from "../../../tools/jenkins/CreateWorkflowWizardTestJenkinsTool";
import CreateSalesforceCertificateGenerationTaskInitializationScreen
  from "./CreateSalesforceCertificateGenerationTaskInitializationScreen";
import CreateSalesforceBulkMigrationInputFields
  from "../salesforce_bulk_migration/CreateSalesforceBulkMigrationInputFields";
import CreateSalesforceCertificateGenerationInputFields from "./CreateSalesforceCertificateGenerationInputFields";
import { getTaskTypeLabel } from "components/tasks/task.types";

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

export default function CreateCertificateTaskWizard({
  flow,
  setButtonContainer,
  backButtonFunction,
    handleClose
}) {
  const [currentScreen, setCurrentScreen] = useState(
    CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.REGISTER_JENKINS_ACCOUNT_SCREEN,
  );
  const [task, setTask] = useState(undefined);
  const [sourceJenkinsToolModel, setSourceJenkinsToolModel] = useState(
    modelHelpers.getNewModelForMetadata(jenkinsConnectionMetadata),
  );
  const [jenkinsSourceToolId, setJenkinsSourceToolId] = useState(undefined);
  const [connectionFailure, setConnectionFailure] = useState(false);
  const [failureCount, setConnectionFailureCount] = useState(0);


  const getCurrentScreen = () => {
    switch (currentScreen) {
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
          <CreateSalesforceCertificateGenerationTaskInitializationScreen
            setTask={setTask}
            flow={flow}
            setCurrentScreen={setCurrentScreen}
            setButtonContainer={setButtonContainer}
            jenkinsToolId={jenkinsSourceToolId}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.EDIT_WORKFLOW_INPUT:
        return (
            <CreateSalesforceCertificateGenerationInputFields
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
            workflowType={getTaskTypeLabel(
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

CreateCertificateTaskWizard.propTypes = {
  flow: PropType.string,
  setButtonContainer: PropType.func,
  backButtonFunction: PropType.func,
  handleClose: PropType.func,
};
