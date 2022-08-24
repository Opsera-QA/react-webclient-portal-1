import React, {useState} from "react";
import CreateSalesforcePipelineWizardCreateGitToolScreen
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/create_screen/CreateSalesforcePipelineWizardCreateGitToolScreen";
import CreateSalesforceWorkflowWizardTestGitToolConnectionScreen
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/test_connection/CreateSalesforceWorkflowWizardTestGitToolConnectionScreen";
import sfdcConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/sfdc/sfdc-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import CreateSalesforceWorkflowWizardTestSalesforceToolConnectionScreen
  from "components/wizard/free_trial/pipeline/salesforce_flow/salesforce_tool/test_connection/CreateSalesforceWorkflowWizardTestSalesforceToolConnectionScreen";
import CreateSalesforcePipelineWizardFlowSelectionScreen
  , {
  SALESFORCE_FLOW_OPTIONS,
} from "components/wizard/free_trial/pipeline/salesforce_flow/flow_selection/CreateSalesforcePipelineWizardFlowSelectionScreen";
import CreateSalesforcePipelineWizardCreateSalesforceToolEditorPanel
  from "components/wizard/free_trial/pipeline/salesforce_flow/salesforce_tool/create_screen/CreateSalesforcePipelineWizardCreateSalesforceToolEditorPanel";
import CreateSalesforceWorkflowWizardCompletionScreen
  from "components/wizard/free_trial/pipeline/salesforce_flow/completion/CreateSalesforceWorkflowWizardCompletionScreen";

export const CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS = {
  SELECT_FLOW_SCREEN: "select_flow_screen",
  CREATE_GIT_TOOL_SCREEN: "create_git_tool_screen",
  TEST_GIT_TOOL_CONNECTION_SCREEN: "test_git_tool_connection_screen",
  CREATE_SOURCE_SALESFORCE_TOOL_SCREEN: "create_source_salesforce_tool_screen",
  TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN: "test_source_salesforce_tool_connection_screen",
  CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN: "create_salesforce_destination_tool_screen",
  TEST_DESTINATION_SALESFORCE_TOOL_CONNECTION_SCREEN: "test_salesforce_source_tool_connection_screen",
  WORKFLOW_COMPLETION_SCREEN: "workflow_completion_screen",
};

export default function CreateSalesforceWorkflowWizard() {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN);
  const [selectedFlow, setSelectedFlow] = useState(SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC);
  const [gitToolModel, setGitToolModel] = useState(undefined);
  const [gitToolOption, setGitToolOption] = useState(undefined);
  const [gitToolId, setGitToolId] = useState(undefined);
  const [sourceSalesforceToolModel, setSourceSalesforceToolModel] = useState(modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata));
  const [deploymentSalesforceToolModel, setDeploymentSalesforceToolModel] = useState(modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata));
  const [salesforceSourceToolId, setSalesforceSourceToolId] = useState(undefined);
  const [salesforceDeploymentToolId, setSalesforceDeploymentToolId] = useState(undefined);
  const [pipelineId, setPipelineId] = useState(undefined);
  const [pipeline, setPipeline] = useState(undefined);
  const [isTaskFlag, setIsTaskFlag] = useState(false);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN:
        return (
          <CreateSalesforcePipelineWizardFlowSelectionScreen
            selectedFlow={selectedFlow}
            setSelectedFlow={setSelectedFlow}
            setCurrentScreen={setCurrentScreen}
            pipelineId={pipelineId}
            setPipelineId={setPipelineId}
            setPipeline={setPipeline}
            setIsTaskFlag={setIsTaskFlag}
            className={"m-2"}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN:
        return (
          <CreateSalesforcePipelineWizardCreateGitToolScreen
            gitToolModel={gitToolModel}
            setGitToolModel={setGitToolModel}
            setCurrentScreen={setCurrentScreen}
            setGitToolId={setGitToolId}
            gitToolOption={gitToolOption}
            setGitToolOption={setGitToolOption}
            gitToolId={gitToolId}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardTestGitToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
            pipeline={pipeline}
            setPipeline={setPipeline}
            isTaskFlag={isTaskFlag}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN:
        return (
          <CreateSalesforcePipelineWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={sourceSalesforceToolModel}
            setSalesforceToolModel={setSourceSalesforceToolModel}
            salesforceToolId={salesforceSourceToolId}
            setSalesforceToolId={setSalesforceSourceToolId}
            setCurrentScreen={setCurrentScreen}
            type={"source"}
            className={"m-3"}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.TEST_SOURCE_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardTestSalesforceToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={salesforceSourceToolId}
            type={"source"}
            pipeline={pipeline}
            setPipeline={setPipeline}
            isTaskFlag={isTaskFlag}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN:
        return (
          <CreateSalesforcePipelineWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={deploymentSalesforceToolModel}
            setSalesforceToolModel={setDeploymentSalesforceToolModel}
            salesforceToolId={salesforceDeploymentToolId}
            setSalesforceToolId={setSalesforceDeploymentToolId}
            setCurrentScreen={setCurrentScreen}
            type={"destination"}
            className={"m-3"}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.TEST_DESTINATION_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardTestSalesforceToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={salesforceDeploymentToolId}
            type={"destination"}
            pipeline={pipeline}
            setPipeline={setPipeline}
            isTaskFlag={isTaskFlag}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardCompletionScreen
            pipeline={pipeline}
            isTaskFlag={isTaskFlag}
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

CreateSalesforceWorkflowWizard.propTypes = {};

