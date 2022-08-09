import React, {useState} from "react";
import CreateSalesforcePipelineWizardCreateGitToolScreen
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/create_screen/CreateSalesforcePipelineWizardCreateGitToolScreen";
import TestGitToolConnectionScreen
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/test_connection/TestGitToolConnectionScreen";
import sfdcConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/sfdc/sfdc-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import CreateSalesforcePipelineWizardCreateSalesforceToolEditorPanel
  from "components/wizard/free_trial/pipeline/salesforce_flow/salesforce_tool/CreateSalesforcePipelineWizardCreateSalesforceToolEditorPanel";
import TestSalesforceToolConnectionScreen
  from "components/wizard/free_trial/pipeline/salesforce_flow/salesforce_tool/TestSalesforceToolConnectionScreen";
import CreateSalesforcePipelineWizardSelectPipelineTemplateScreen
  from "components/wizard/free_trial/pipeline/salesforce_flow/pipeline_template_selection/CreateSalesforcePipelineWizardSelectPipelineTemplateScreen";

export const CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS = {
  CREATE_GIT_TOOL_SCREEN: "create_git_tool_screen",
  TEST_GIT_TOOL_CONNECTION_SCREEN: "test_git_tool_connection_screen",
  CREATE_SALESFORCE_TOOL_SCREEN: "create_salesforce_source_tool_screen",
  TEST_SALESFORCE_TOOL_CONNECTION_SCREEN: "test_salesforce_source_tool_connection_screen",
  SELECT_PIPELINE_TEMPLATE_SCREEN: "select_pipeline_template_screen",
};

export default function CreateSalesforcePipelineWizard() {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.SELECT_PIPELINE_TEMPLATE_SCREEN);
  const [gitToolModel, setGitToolModel] = useState(undefined);
  const [gitToolOption, setGitToolOption] = useState(undefined);
  const [gitToolId, setGitToolId] = useState(undefined);
  const [salesforceToolModel, setSalesforceToolModel] = useState(modelHelpers.getNewModelForMetadata(sfdcConnectionMetadata));
  const [salesforceToolId, setSalesforceToolId] = useState(undefined);
  const [pipelineId, setPipelineId] = useState(undefined);

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN:
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
      case CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN:
        return (
          <TestGitToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            gitToolId={gitToolId}
            gitToolOption={gitToolOption}
          />
        );
      case CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.CREATE_SALESFORCE_TOOL_SCREEN:
        return (
          <CreateSalesforcePipelineWizardCreateSalesforceToolEditorPanel
            salesforceToolModel={salesforceToolModel}
            setSalesforceToolModel={setSalesforceToolModel}
            salesforceToolId={salesforceToolId}
            setSalesforceToolId={setSalesforceToolId}
            setCurrentScreen={setCurrentScreen}
            className={"m-3"}
          />
        );
      case CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.TEST_SALESFORCE_TOOL_CONNECTION_SCREEN:
        return (
          <TestSalesforceToolConnectionScreen
            setCurrentScreen={setCurrentScreen}
            salesforceToolId={salesforceToolId}
          />
        );
      case CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.SELECT_PIPELINE_TEMPLATE_SCREEN:
        return (
          <CreateSalesforcePipelineWizardSelectPipelineTemplateScreen
            pipelineId={pipelineId}
            setPipelineId={setPipelineId}
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

CreateSalesforcePipelineWizard.propTypes = {};

