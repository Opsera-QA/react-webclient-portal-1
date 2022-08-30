import React, { useEffect } from "react";
import PropTypes from "prop-types";
import VanitySetTextInputBase from "temp-library-components/inputs/VanitySetTextInputBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import Col from "react-bootstrap/Col";
import GithubTwoFactorAuthenticationBooleanToggleInput
  from "components/inventory/tools/tool_details/tool_jobs/github/GithubTwoFactorAuthenticationBooleanToggleInput";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import CreateFreeTrialGithubToolButton
  from "components/wizard/free_trial/workflows/flows/tools/git/github/CreateFreeTrialGithubToolButton";
import Row from "react-bootstrap/Row";
import CreateSalesforceWorkflowWizardToolInputBase
  from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizardToolInputBase";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { Form } from "react-bootstrap";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import CancelOverlayButton from "components/common/buttons/cancel/overlay/CancelOverlayButton";

const getButtonContainer = (
  stepBackFromWizardFunction,
  gitToolModel,
  setGitToolId,
  gitToolId,
  onSuccessFunction,
  ) => {
  return (
    <ButtonContainerBase
      leftSideButtons={getLeftHandButtons(stepBackFromWizardFunction)}
      className={"p-3"}
    >
      <CreateFreeTrialGithubToolButton
        gitToolModel={gitToolModel}
        setGitToolId={setGitToolId}
        gitToolId={gitToolId}
        onSuccessFunction={onSuccessFunction}
      />
    </ButtonContainerBase>
  );
};

const getLeftHandButtons = (stepBackFromWizardFunction) => {
  return (
    <div className={"d-flex"}>
      <BackButtonBase
        backButtonFunction={stepBackFromWizardFunction}
        className={"mr-2"}
      />
      <CancelOverlayButton />
    </div>
  );
};

export default function CreateWorkflowWizardCreateGithubToolEditorPanel(
  {
    className,
    gitToolId,
    setGitToolId,
    onSuccessFunction,
    gitToolModel,
    setGitToolModel,
    setButtonContainer,
    backButtonFunction,
  }) {
  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer({...getButtonContainer(
          backButtonFunction,
        gitToolModel,
        setGitToolId,
        gitToolId,
        onSuccessFunction,
      )});
    }
  }, []);

  const getDynamicFields = () => {
    if (gitToolModel?.getData("twoFactorAuthentication") === true) {
      return (
        <div>
          <VaultTextInput
            dataObject={gitToolModel}
            setDataObject={setGitToolModel}
            fieldName={"secretPrivateKey"}
          />
          <VaultTextInput
            dataObject={gitToolModel}
            setDataObject={setGitToolModel}
            fieldName={"secretAccessTokenKey"}
          />
        </div>
      );
    }

    return (
      <VaultTextInput
        dataObject={gitToolModel}
        setDataObject={setGitToolModel}
        fieldName={"accountPassword"}
      />
    );
  };

  if (gitToolModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <Form>
        <Row>
          <Col sm={12}>
            <CreateSalesforceWorkflowWizardToolInputBase
              model={gitToolModel}
              setModel={setGitToolModel}
              toolId={gitToolId}
              setToolId={setGitToolId}
              toolIdentifier={toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB}
            />
          </Col>
          <Col sm={12}>
            <VanitySetTextInputBase
              fieldName={"accountUsername"}
              model={gitToolModel}
              setModel={setGitToolModel}
            />
          </Col>
          <Col sm={12}>
            <GithubTwoFactorAuthenticationBooleanToggleInput
              model={gitToolModel}
              setModel={setGitToolModel}
            />
          </Col>
          <Col sm={12}>
            {getDynamicFields()}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

CreateWorkflowWizardCreateGithubToolEditorPanel.propTypes = {
  gitToolModel: PropTypes.object,
  setGitToolModel: PropTypes.func,
  gitToolId: PropTypes.string,
  setGitToolId: PropTypes.func,
  onSuccessFunction: PropTypes.func,
  className: PropTypes.string,
  setButtonContainer: PropTypes.func,
  backButtonFunction: PropTypes.func,
};


