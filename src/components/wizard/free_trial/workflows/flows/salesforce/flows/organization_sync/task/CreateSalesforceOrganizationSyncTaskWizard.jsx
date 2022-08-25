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
import CreateSalesforceOrganizationSyncTaskWizardCompletionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/completion/CreateSalesforceOrganizationSyncTaskWizardCompletionScreen";
import CreateSalesforceOrganizationSyncTaskTestGitToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/tools/git/connection/CreateSalesforceOrganizationSyncTaskTestGitToolConnectionScreen";
import CreateSalesforceOrganizationSyncTaskWizardTestSalesforceSourceToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/tools/salesforce/connection/CreateSalesforceOrganizationSyncTaskWizardTestSalesforceSourceToolConnectionScreen";
import CreateSalesforceOrganizationSyncTaskWizardTestSalesforceDestinationToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/tools/salesforce/connection/CreateSalesforceOrganizationSyncTaskWizardTestSalesforceDestinationToolConnectionScreen";

export const CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS = {
  INITIALIZATION_SCREEN: "initialization_screen",
  CREATE_GIT_TOOL_SCREEN: "create_git_tool_screen",
  TEST_GIT_TOOL_CONNECTION_SCREEN: "test_git_tool_connection_screen",
  CREATE_SOURCE_SALESFORCE_TOOL_SCREEN: "create_source_salesforce_tool_screen",
  TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN: "test_source_salesforce_tool_connection_screen",
  CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN: "create_salesforce_destination_tool_screen",
  TEST_DESTINATION_SALESFORCE_TOOL_CONNECTION_SCREEN: "test_salesforce_source_tool_connection_screen",
  WORKFLOW_COMPLETION_SCREEN: "workflow_completion_screen",
};

export default function CreateSalesforceOrganizationSyncTaskWizard(
  {
    flow,
  }) {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.INITIALIZATION_SCREEN);
  const [task, setTask] = useState(undefined);
  const [gitToolModel, setGitToolModel] = useState(undefined);
  const [gitToolOption, setGitToolOption] = useState(undefined);
  const [gitToolId, setGitToolId] = useState(undefined);
  const [sourceSalesforceToolModel, setSourceSalesforceToolModel] = useState(modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata));
  const [deploymentSalesforceToolModel, setDeploymentSalesforceToolModel] = useState(modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata));
  const [salesforceSourceToolId, setSalesforceSourceToolId] = useState(undefined);
  const [salesforceDestinationToolId, setSalesforceDestinationToolId] = useState(undefined);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncTaskInitializationScreen
            setTask={setTask}
            flow={flow}
            setCurrentScreen={setCurrentScreen}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN:
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
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncTaskTestGitToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            task={task}
            setTask={setTask}
            className={"m-3"}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN:
        return (
          <CreateWorkflowWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={sourceSalesforceToolModel}
            setSalesforceToolModel={setSourceSalesforceToolModel}
            salesforceToolId={salesforceSourceToolId}
            setSalesforceToolId={setSalesforceSourceToolId}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN)}
            type={"source"}
            className={"m-3"}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncTaskWizardTestSalesforceSourceToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            task={task}
            setTask={setTask}
            salesforceToolId={salesforceSourceToolId}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN:
        return (
          <CreateWorkflowWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={deploymentSalesforceToolModel}
            setSalesforceToolModel={setDeploymentSalesforceToolModel}
            salesforceToolId={salesforceDestinationToolId}
            setSalesforceToolId={setSalesforceDestinationToolId}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_DESTINATION_SALESFORCE_TOOL_CONNECTION_SCREEN)}
            type={"destination"}
            className={"m-3"}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.TEST_DESTINATION_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncTaskWizardTestSalesforceDestinationToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            task={task}
            setTask={setTask}
            salesforceToolId={salesforceDestinationToolId}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_TASK_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncTaskWizardCompletionScreen
            task={task}
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
};

