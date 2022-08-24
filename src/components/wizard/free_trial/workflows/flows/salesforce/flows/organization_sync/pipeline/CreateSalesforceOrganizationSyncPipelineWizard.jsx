import React, {useState} from "react";
import CreateWorkflowWizardCreateGitToolScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/git/CreateWorkflowWizardCreateGitToolScreenBase";
import CreateSalesforceWorkflowWizardTestGitToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/git_tool/test_connection/CreateSalesforceWorkflowWizardTestGitToolConnectionScreen";
import sfdcConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/sfdc/sfdc-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import CreateSalesforceWorkflowWizardTestSalesforceToolConnectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/salesforce_tool/test_connection/CreateSalesforceWorkflowWizardTestSalesforceToolConnectionScreen";
import CreateSalesforceWorkflowWizardFlowSelectionScreen
  , {
  SALESFORCE_FLOW_OPTIONS,
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/selection/CreateSalesforceWorkflowWizardFlowSelectionScreen";
import CreateWorkflowWizardCreateSalesforceToolEditorPanel
  from "components/wizard/free_trial/workflows/flows/tools/salesforce/CreateWorkflowWizardCreateSalesforceToolEditorPanel";
import CreateSalesforceWorkflowWizardCompletionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/completion/CreateSalesforceWorkflowWizardCompletionScreen";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import pipelineActions from "components/workflow/pipeline-actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import CreateWorkflowWizardPipelineInitializationScreen
  from "components/wizard/free_trial/workflows/flows/pipeline/initialization/CreateWorkflowWizardPipelineInitializationScreen";
import * as PropType from "prop-types";
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
  }) {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN);
  const [gitToolModel, setGitToolModel] = useState(undefined);
  const [gitToolOption, setGitToolOption] = useState(undefined);
  const [gitToolId, setGitToolId] = useState(undefined);
  const [sourceSalesforceToolModel, setSourceSalesforceToolModel] = useState(modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata));
  const [deploymentSalesforceToolModel, setDeploymentSalesforceToolModel] = useState(modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata));
  const [salesforceSourceToolId, setSalesforceSourceToolId] = useState(undefined);
  const [salesforceDeploymentToolId, setSalesforceDeploymentToolId] = useState(undefined);
  const [pipeline, setPipeline] = useState(undefined);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return (
          <CreateWorkflowWizardPipelineInitializationScreen
            setPipeline={setPipeline}
            type={salesforceWorkflowFlowConstants.getLabelForSalesforceFlow(flow)}
            selectedFlow={flow}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN)}
            // templateId={}
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
          <CreateSalesforceWorkflowWizardTestGitToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            pipeline={pipeline}
            setPipeline={setPipeline}
            onSuccessFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN)}
            onFailureFunction={() => setCurrentScreen(CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN)}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN:
        return (
          <CreateWorkflowWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={sourceSalesforceToolModel}
            setSalesforceToolModel={setSourceSalesforceToolModel}
            salesforceToolId={salesforceSourceToolId}
            setSalesforceToolId={setSalesforceSourceToolId}
            setCurrentScreen={setCurrentScreen}
            type={"source"}
            className={"m-3"}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardTestSalesforceToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={salesforceSourceToolId}
            type={"source"}
            pipeline={pipeline}
            setPipeline={setPipeline}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN:
        return (
          <CreateWorkflowWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={deploymentSalesforceToolModel}
            setSalesforceToolModel={setDeploymentSalesforceToolModel}
            salesforceToolId={salesforceDeploymentToolId}
            setSalesforceToolId={setSalesforceDeploymentToolId}
            setCurrentScreen={setCurrentScreen}
            type={"destination"}
            className={"m-3"}
          />
        );
      case CREATE_SALESFORCE_ORGANIZATION_SYNC_PIPELINE_WIZARD_SCREENS.TEST_DESTINATION_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardTestSalesforceToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={salesforceDeploymentToolId}
            type={"destination"}
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

