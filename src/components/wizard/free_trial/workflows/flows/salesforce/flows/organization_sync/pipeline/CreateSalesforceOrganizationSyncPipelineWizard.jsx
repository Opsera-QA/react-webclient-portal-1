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

export const CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS = {
  INITIALIZATION_SCREEN: "initialization_screen",
  CREATE_GIT_TOOL_SCREEN: "create_git_tool_screen",
  TEST_GIT_TOOL_CONNECTION_SCREEN: "test_git_tool_connection_screen",
  CREATE_SOURCE_SALESFORCE_TOOL_SCREEN: "create_source_salesforce_tool_screen",
  TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN: "test_source_salesforce_tool_connection_screen",
  CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN: "create_salesforce_destination_tool_screen",
  TEST_DESTINATION_SALESFORCE_TOOL_CONNECTION_SCREEN: "test_salesforce_source_tool_connection_screen",
  WORKFLOW_COMPLETION_SCREEN: "workflow_completion_screen",
};

export default function CreateSalesforceOrganizationSyncPipelineWizard(
  {
    flow,
    setButtonContainer,
    backButtonFunction,
  }) {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN);
  const [gitToolModel, setGitToolModel] = useState(undefined);
  const [gitToolOption, setGitToolOption] = useState(undefined);
  const [gitToolId, setGitToolId] = useState(undefined);
  const [sourceSalesforceToolModel, setSourceSalesforceToolModel] = useState(modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata));
  const [destinationSalesforceToolModel, setDestinationSalesforceToolModel] = useState(modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata));
  const [salesforceSourceToolId, setSalesforceSourceToolId] = useState(undefined);
  const [salesforceDeploymentToolId, setSalesforceDeploymentToolId] = useState(undefined);
  const [pipeline, setPipeline] = useState(undefined);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncPipelineInitializationScreen
            setPipeline={setPipeline}
            flow={flow}
            setCurrentScreen={setCurrentScreen}
            setButtonContainer={setButtonContainer}
          />
        );
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
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncPipelineTestGitToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            pipeline={pipeline}
            setPipeline={setPipeline}
            flow={flow}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN:
        return (
          <CreateWorkflowWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={sourceSalesforceToolModel}
            setSalesforceToolModel={setSourceSalesforceToolModel}
            salesforceToolId={salesforceSourceToolId}
            setSalesforceToolId={setSalesforceSourceToolId}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN)}
            type={"source"}
            className={"m-3"}
            setButtonContainer={setButtonContainer}
            backButtonFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN)}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceSourceToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={salesforceSourceToolId}
            pipeline={pipeline}
            setPipeline={setPipeline}
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN:
        return (
          <CreateWorkflowWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={destinationSalesforceToolModel}
            setSalesforceToolModel={setDestinationSalesforceToolModel}
            salesforceToolId={salesforceDeploymentToolId}
            setSalesforceToolId={setSalesforceDeploymentToolId}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_DESTINATION_SALESFORCE_TOOL_CONNECTION_SCREEN)}
            type={"destination"}
            className={"m-3"}
            setButtonContainer={setButtonContainer}
            backButtonFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN)}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_DESTINATION_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceOrganizationSyncPipelineWizardTestSalesforceDestinationToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={salesforceDeploymentToolId}
            pipeline={pipeline}
            setPipeline={setPipeline}
            flow={flow}
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

