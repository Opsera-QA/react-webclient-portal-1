import React, {useState} from "react";
import PropTypes from "prop-types";
import CreateSalesforcePipelineWizardCreateGitToolScreen
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/create_screen/CreateSalesforcePipelineWizardCreateGitToolScreen";
import TestGitToolConnectionScreen
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/test_connection/TestGitToolConnectionScreen";

export const CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS = {
  CREATE_GIT_TOOL_SCREEN: "create_git_tool_screen",
  TEST_GIT_TOOL_CONNECTION_SCREEN: "test_git_tool_connection_screen",
  CREATE_SALESFORCE_SOURCE_TOOL_SCREEN: "create_salesforce_source_tool_screen",
  TEST_SALESFORCE_SOURCE_TOOL_CONNECTION_SCREEN: "test_salesforce_source_tool_connection_screen",
  CREATE_SALESFORCE_DESTINATION_TOOL_SCREEN: "create_salesforce_destination_tool_screen",
  TEST_SALESFORCE_DESTINATION_TOOL_CONNECTION_SCREEN: "test_salesforce_destination_tool_connection_screen",
};

function CreateSalesforcePipelineWizard() {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.CREATE_GIT_TOOL_SCREEN);
  const [gitToolModel, setGitToolModel] = useState(undefined);
  const [gitToolOption, setGitToolOption] = useState(undefined);
  const [gitToolId, setGitToolId] = useState(undefined);

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
      case CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.CREATE_SALESFORCE_SOURCE_TOOL_SCREEN:
      case CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.TEST_SALESFORCE_SOURCE_TOOL_CONNECTION_SCREEN:
      case CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.CREATE_SALESFORCE_DESTINATION_TOOL_SCREEN:
      case CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.TEST_SALESFORCE_DESTINATION_TOOL_CONNECTION_SCREEN:
    }
  };

  return (
    <div>
      {getCurrentScreen()}
    </div>
  );
}

CreateSalesforcePipelineWizard.propTypes = {
  toolMetadata: PropTypes.object,
};

export default CreateSalesforcePipelineWizard;


