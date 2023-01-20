import React, { useEffect } from "react";
import PropTypes from "prop-types";
import GitToolCreationSelectionOptionInput from "components/wizard/free_trial/workflows/flows/tools/git/GitToolCreationSelectionOptionInput";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import CreateWorkflowWizardCreateGithubToolEditorPanel
  from "components/wizard/free_trial/workflows/flows/tools/git/github/CreateWorkflowWizardCreateGithubToolEditorPanel";
import CreateWorkflowWizardCreateGitlabToolEditorPanel
  from "components/wizard/free_trial/workflows/flows/tools/git/gitlab/CreateWorkflowWizardCreateGitlabToolEditorPanel";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import CreateWorkflowWizardRegisterAccountContainer
  from "components/wizard/free_trial/workflows/flows/tools/CreateWorkflowWizardRegisterAccountContainer";

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
    backButtonFunction,
    setButtonContainer,
    toolType,
  }) {
  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase
          backButtonFunction={backButtonFunction}
        />
      );
    }
  }, []);

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
            backButtonFunction={backButtonFunction}
            setButtonContainer={setButtonContainer}
            toolType={toolType}
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
            backButtonFunction={backButtonFunction}
            setButtonContainer={setButtonContainer}
            toolType={toolType}
          />
        );
    }
  };

  return (
    <div className={className}>
      <GitToolCreationSelectionOptionInput
        gitToolOption={gitToolOption}
        setGitToolOption={setGitToolOption}
        setGitToolModel={setGitToolModel}
        setGitToolId={setGitToolId}
      />
      <CreateWorkflowWizardRegisterAccountContainer>
        {getEditorPanel()}
      </CreateWorkflowWizardRegisterAccountContainer>
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
  backButtonFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
  toolType: PropTypes.string,
};


