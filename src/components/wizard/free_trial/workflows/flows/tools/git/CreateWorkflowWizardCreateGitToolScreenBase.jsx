import React, { useEffect } from "react";
import PropTypes from "prop-types";
import GitToolCreationSelectionOptionInput from "components/wizard/free_trial/workflows/flows/tools/git/GitToolCreationSelectionOptionInput";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import CreateWorkflowWizardCreateGithubToolEditorPanel
  from "components/wizard/free_trial/workflows/flows/tools/git/github/CreateWorkflowWizardCreateGithubToolEditorPanel";
import CreateWorkflowWizardCreateGitlabToolEditorPanel
  from "components/wizard/free_trial/workflows/flows/tools/git/gitlab/CreateWorkflowWizardCreateGitlabToolEditorPanel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";

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
      <Row>
        <Col xs={0} sm={0} md={0} lg={2} xl={3} />
        <Col xs={12} sm={12} md={12} lg={8} xl={6}>
          {getEditorPanel()}
        </Col>
        <Col xs={0} sm={0} md={0} lg={2} xl={3} />
      </Row>
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
};


