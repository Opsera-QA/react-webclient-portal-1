import React, {useState} from "react";
import CreateWorkflowWizardCreateGitToolScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/git/CreateWorkflowWizardCreateGitToolScreenBase";
import sfdcConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/sfdc/sfdc-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import CreateWorkflowWizardCreateSalesforceToolEditorPanel
  from "components/wizard/free_trial/workflows/flows/tools/salesforce/CreateWorkflowWizardCreateSalesforceToolEditorPanel";
import CreateWorkflowWizardPipelineCompletionScreen
  from "components/wizard/free_trial/workflows/flows/pipeline/completion/CreateWorkflowWizardPipelineCompletionScreen";
import * as PropType from "prop-types";
import CreateSalesforceOrganizationSyncPipelineInitializationScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/initialization/CreateSalesforceOrganizationSyncPipelineInitializationScreen";
import CreateSalesforceOrganizationSyncPipelineTestGitToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/tools/git/connection/CreateSalesforceOrganizationSyncPipelineTestGitToolConnectionScreen";
import CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceSourceToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/tools/salesforce/connection/CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceSourceToolConnectionScreen";
import CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceDestinationToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/tools/salesforce/connection/CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceDestinationToolConnectionScreen";
import {
  salesforceWorkflowFlowConstants
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";
import CreateWorkflowWizardTestGitToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/tools/git/CreateWorkflowWizardTestGitToolConnectionScreen";
import CreateWorkflowWizardRegisterGitCredentialsInJenkinsToolScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/jenkins/CreateWorkflowWizardRegisterGitCredentialsInJenkinsToolScreenBase";
import {
  CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES
} from "components/wizard/free_trial/workflows/flows/tools/CreateWorkflowWizardRegisterToolHeaderText";

export const CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS = {
  CREATE_GIT_TOOL_SCREEN: "create_git_tool_screen",
  TEST_GIT_TOOL_CONNECTION_SCREEN: "test_git_tool_connection_screen",
  CREATE_SOURCE_SALESFORCE_TOOL_SCREEN: "create_source_salesforce_tool_screen",
  TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN: "test_source_salesforce_tool_connection_screen",
  CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN: "create_salesforce_destination_tool_screen",
  TEST_DESTINATION_SALESFORCE_TOOL_CONNECTION_SCREEN: "test_salesforce_source_tool_connection_screen",
  INITIALIZATION_SCREEN: "initialization_screen",
  REGISTER_GIT_ACCOUNT_IN_JENKINS_SCREEN: "register_git_account_in_jenkins_screen",
  WORKFLOW_COMPLETION_SCREEN: "workflow_completion_screen",
};

export default function CreateSalesforceOrganizationSyncPipelineWizard(
  {
    flow,
    setButtonContainer,
    backButtonFunction,
  }) {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN);
  const [gitToolModel, setGitToolModel] = useState(undefined);
  const [gitToolOption, setGitToolOption] = useState(undefined);
  const [gitToolId, setGitToolId] = useState(undefined);
  const [sourceSalesforceToolModel, setSourceSalesforceToolModel] = useState(modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata));
  const [sourceSalesforceToolId, setSourceSalesforceToolId] = useState(undefined);
  const [destinationSalesforceToolModel, setDestinationSalesforceToolModel] = useState(modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata));
  const [destinationSalesforceToolId, setDestinationSalesforceToolId] = useState(undefined);
  const [pipeline, setPipeline] = useState(undefined);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN:
        return (
          <CreateWorkflowWizardCreateGitToolScreenBase
            gitToolModel={gitToolModel}
            setGitToolModel={setGitToolModel}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN)}
            setGitToolId={setGitToolId}
            gitToolOption={gitToolOption}
            setGitToolOption={setGitToolOption}
            gitToolId={gitToolId}
            className={"m-3"}
            setButtonContainer={setButtonContainer}
            backButtonFunction={backButtonFunction}
            toolType={CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES.SOURCE}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncPipelineTestGitToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            pipeline={pipeline}
            flow={flow}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN:
        return (
          <CreateWorkflowWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={sourceSalesforceToolModel}
            setSalesforceToolModel={setSourceSalesforceToolModel}
            salesforceToolId={sourceSalesforceToolId}
            setSalesforceToolId={setSourceSalesforceToolId}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN)}
            toolType={CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES.SOURCE}
            className={"m-3"}
            setButtonContainer={setButtonContainer}
            backButtonFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN)}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceSourceToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={sourceSalesforceToolId}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN:
        return (
          <CreateWorkflowWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={destinationSalesforceToolModel}
            setSalesforceToolModel={setDestinationSalesforceToolModel}
            salesforceToolId={destinationSalesforceToolId}
            setSalesforceToolId={setDestinationSalesforceToolId}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_DESTINATION_SALESFORCE_TOOL_CONNECTION_SCREEN)}
            toolType={CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES.DESTINATION}
            className={"m-3"}
            setButtonContainer={setButtonContainer}
            backButtonFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN)}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_DESTINATION_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceDestinationToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={destinationSalesforceToolId}
            flow={flow}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncPipelineInitializationScreen
            setPipeline={setPipeline}
            flow={flow}
            setCurrentScreen={setCurrentScreen}
            setButtonContainer={setButtonContainer}
            destinationSalesforceToolId={destinationSalesforceToolId}
            sourceSalesforceToolId={sourceSalesforceToolId}
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.REGISTER_GIT_ACCOUNT_IN_JENKINS_SCREEN:
        return (
          <CreateWorkflowWizardRegisterGitCredentialsInJenkinsToolScreenBase
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN)}
            onFailureFunction={() => {}}
            jenkinsToolId={salesforcePipelineHelper.getJenkinsToolIdFromCreatePackageStep(
              pipeline,
            )}
            className={"m-3"}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN:
        return (
          <CreateWorkflowWizardPipelineCompletionScreen
            pipeline={pipeline}
            workflowType={salesforceWorkflowFlowConstants.getLabelForSalesforceFlow(flow)}
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

CreateSalesforceOrganizationSyncPipelineWizard.propTypes = {
  flow: PropType.string,
  setButtonContainer: PropType.func,
  backButtonFunction: PropType.func,
};

