import React from "react";
import PropTypes from "prop-types";
import GitToolCreationRadioOptionInput from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/create_screen/GitToolCreationRadioOptionInput";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import CreateSalesforcePipelineWizardCreateGithubToolEditorPanel
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/create_screen/github/CreateSalesforcePipelineWizardCreateGithubToolEditorPanel";
import CreateSalesforcePipelineWizardCreateGitlabToolEditorPanel
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/create_screen/gitlab/CreateSalesforcePipelineWizardCreateGitlabToolEditorPanel";

function CreateSalesforcePipelineWizardCreateGitToolScreen(
  {
    setGitToolId,
    setCurrentScreen,
    gitToolOption,
    setGitToolOption
  }) {
  const getEditorPanel = () => {
    switch (gitToolOption) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB:
        return (
          <CreateSalesforcePipelineWizardCreateGithubToolEditorPanel
            setGitToolId={setGitToolId}
            setCurrentScreen={setCurrentScreen}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB:
        return (
          <CreateSalesforcePipelineWizardCreateGitlabToolEditorPanel
            setGitToolId={setGitToolId}
            setCurrentScreen={setCurrentScreen}
          />
        );
    }
  };

  return (
    <div className={"m-3"}>
      <GitToolCreationRadioOptionInput
        gitToolOption={gitToolOption}
        setGitToolOption={setGitToolOption}
      />
      {getEditorPanel()}
    </div>
  );
}

CreateSalesforcePipelineWizardCreateGitToolScreen.propTypes = {
  gitToolCreationModel: PropTypes.object,
  setGitToolCreationModel: PropTypes.func,
  setGitToolId: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  gitToolOption: PropTypes.string,
  setGitToolOption: PropTypes.func,
};

export default CreateSalesforcePipelineWizardCreateGitToolScreen;


