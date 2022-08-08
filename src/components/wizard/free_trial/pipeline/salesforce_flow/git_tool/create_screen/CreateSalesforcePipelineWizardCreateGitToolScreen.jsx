import React from "react";
import PropTypes from "prop-types";
import GitToolCreationRadioOptionInput from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/create_screen/GitToolCreationRadioOptionInput";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import CreateSalesforcePipelineWizardCreateGithubToolEditorPanel
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/create_screen/github/CreateSalesforcePipelineWizardCreateGithubToolEditorPanel";
import CreateSalesforcePipelineWizardCreateGitlabToolEditorPanel
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/create_screen/gitlab/CreateSalesforcePipelineWizardCreateGitlabToolEditorPanel";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function CreateSalesforcePipelineWizardCreateGitToolScreen(
  {
    setGitToolId,
    setCurrentScreen,
    gitToolOption,
    setGitToolOption,
    gitToolId,
    gitToolModel,
    setGitToolModel,
  }) {
  const getDynamicField = () => {
    if (isMongoDbId(gitToolId) !== true) {
      return (
        <GitToolCreationRadioOptionInput
          gitToolOption={gitToolOption}
          setGitToolOption={setGitToolOption}
          setGitToolModel={setGitToolModel}
        />
      );
    }
  };

  const getEditorPanel = () => {
    switch (gitToolOption) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB:
        return (
          <CreateSalesforcePipelineWizardCreateGithubToolEditorPanel
            gitToolModel={gitToolModel}
            setGitToolModel={setGitToolModel}
            setGitToolId={setGitToolId}
            setCurrentScreen={setCurrentScreen}
            gitToolId={gitToolId}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB:
        return (
          <CreateSalesforcePipelineWizardCreateGitlabToolEditorPanel
            gitToolModel={gitToolModel}
            setGitToolModel={setGitToolModel}
            setGitToolId={setGitToolId}
            setCurrentScreen={setCurrentScreen}
            gitToolId={gitToolId}
          />
        );
    }
  };

  return (
    <div className={"m-3"}>
      {getDynamicField()}
      {getEditorPanel()}
    </div>
  );
}

CreateSalesforcePipelineWizardCreateGitToolScreen.propTypes = {
  gitToolModel: PropTypes.object,
  setGitToolModel: PropTypes.func,
  setGitToolId: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  gitToolOption: PropTypes.string,
  setGitToolOption: PropTypes.func,
  gitToolId: PropTypes.string,
};

export default CreateSalesforcePipelineWizardCreateGitToolScreen;


