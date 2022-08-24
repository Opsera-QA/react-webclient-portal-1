import React from "react";
import PropTypes from "prop-types";
import GitToolCreationRadioOptionInput from "components/wizard/free_trial/workflows/flows/tools/git/GitToolCreationRadioOptionInput";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import CreateWorkflowWizardCreateGithubToolEditorPanel
  from "components/wizard/free_trial/workflows/flows/tools/git/github/CreateWorkflowWizardCreateGithubToolEditorPanel";
import CreateWorkflowWizardCreateGitlabToolEditorPanel
  from "components/wizard/free_trial/workflows/flows/tools/git/gitlab/CreateWorkflowWizardCreateGitlabToolEditorPanel";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export default function CreateWorkflowWizardCreateGitToolScreenBase(
  {
    setGitToolId,
    onSuccessFunction,
    gitToolOption,
    setGitToolOption,
    gitToolId,
    gitToolModel,
    setGitToolModel,
    className,
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
          <CreateWorkflowWizardCreateGithubToolEditorPanel
            gitToolModel={gitToolModel}
            setGitToolModel={setGitToolModel}
            setGitToolId={setGitToolId}
            onSuccessFunction={onSuccessFunction}
            gitToolId={gitToolId}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB:
        return (
          <CreateWorkflowWizardCreateGitlabToolEditorPanel
            gitToolModel={gitToolModel}
            setGitToolModel={setGitToolModel}
            setGitToolId={setGitToolId}
            onSuccessFunction={onSuccessFunction}
            gitToolId={gitToolId}
          />
        );
    }
  };

  return (
    <div className={className}>
      {getDynamicField()}
      {getEditorPanel()}
    </div>
  );
}

CreateWorkflowWizardCreateGitToolScreenBase.propTypes = {
  gitToolModel: PropTypes.object,
  setGitToolModel: PropTypes.func,
  setGitToolId: PropTypes.func,
  onSuccessFunction: PropTypes.func,
  gitToolOption: PropTypes.string,
  setGitToolOption: PropTypes.func,
  gitToolId: PropTypes.string,
  className: PropTypes.string,
};


