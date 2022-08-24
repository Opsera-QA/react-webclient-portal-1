import React, {useState} from "react";
import CreateWorkflowWizardCreateGitToolScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/git/CreateWorkflowWizardCreateGitToolScreenBase";
import sfdcConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/sfdc/sfdc-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import CreateSalesforceWorkflowWizardTestSalesforceToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/salesforce_tool/test_connection/CreateSalesforceWorkflowWizardTestSalesforceToolConnectionScreen";
import CreateWorkflowWizardCreateSalesforceToolEditorPanel
  from "components/wizard/free_trial/workflows/flows/tools/salesforce/CreateWorkflowWizardCreateSalesforceToolEditorPanel";
import CreateSalesforceWorkflowWizardCompletionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/completion/CreateSalesforceWorkflowWizardCompletionScreen";
import * as PropType from "prop-types";
import CreateWorkflowWizardSalesforceOrganizationSyncPipelineInitializationScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/initialization/CreateWorkflowWizardSalesforceOrganizationSyncPipelineInitializationScreen";
import CreateWorkflowWizardSalesforceOrganizationSyncPipelineTestGitToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/tools/git/connection/CreateWorkflowWizardSalesforceOrganizationSyncPipelineTestGitToolConnectionScreen";
import CreateWorkflowWizardSalesforceOrganizationSyncPipelineWizardTestSalesforceSourceToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/tools/salesforce/connection/CreateWorkflowWizardSalesforceOrganizationSyncPipelineWizardTestSalesforceSourceToolConnectionScreen";
import CreateWorkflowWizardSalesforceOrganizationSyncPipelineWizardTestSalesforceDestinationToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/tools/salesforce/connection/CreateWorkflowWizardSalesforceOrganizationSyncPipelineWizardTestSalesforceDestinationToolConnectionScreen";

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
  }) {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN);
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
          <CreateWorkflowWizardSalesforceOrganizationSyncPipelineInitializationScreen
            setPipeline={setPipeline}
            flow={flow}
            setCurrentScreen={setCurrentScreen}
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
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN:
        return (
          <CreateWorkflowWizardSalesforceOrganizationSyncPipelineTestGitToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            pipeline={pipeline}
            setPipeline={setPipeline}
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
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateWorkflowWizardSalesforceOrganizationSyncPipelineWizardTestSalesforceSourceToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={salesforceSourceToolId}
            pipeline={pipeline}
            setPipeline={setPipeline}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN:
        return (
          <CreateWorkflowWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={destinationSalesforceToolModel}
            setSalesforceToolModel={setDestinationSalesforceToolModel}
            salesforceToolId={salesforceDeploymentToolId}
            setSalesforceToolId={setSalesforceDeploymentToolId}
            setCurrentScreen={setCurrentScreen}
            type={"destination"}
            className={"m-3"}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_DESTINATION_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateWorkflowWizardSalesforceOrganizationSyncPipelineWizardTestSalesforceDestinationToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={salesforceDeploymentToolId}
            pipeline={pipeline}
            setPipeline={setPipeline}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardCompletionScreen
            pipeline={pipeline}
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
};

