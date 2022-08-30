import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VanitySetTextInputBase from "temp-library-components/inputs/VanitySetTextInputBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import Col from "react-bootstrap/Col";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import Row from "react-bootstrap/Row";
import CreateFreeTrialGitlabToolButton
  from "components/wizard/free_trial/workflows/flows/tools/git/gitlab/CreateFreeTrialGitlabToolButton";
import GitlabTwoFactorAuthenticationBooleanToggleInput
  from "components/inventory/tools/tool_details/tool_jobs/gitlab/GitlabTwoFactorAuthenticationBooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
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
      <CreateFreeTrialGitlabToolButton
        gitToolModel={gitToolModel}
        onSuccessFunction={onSuccessFunction}
        gitToolId={gitToolId}
        setGitToolId={setGitToolId}
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

export default function CreateWorkflowWizardCreateGitlabToolEditorPanel(
  {
    gitToolModel,
    setGitToolModel,
    className,
    gitToolId,
    setGitToolId,
    onSuccessFunction,
    backButtonFunction,
    setButtonContainer,
  }) {

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(getButtonContainer(
        backButtonFunction,
          gitToolModel,
          setGitToolId,
          gitToolId,
          onSuccessFunction,
        ));
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
              toolIdentifier={toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB}
            />
          </Col>
          <Col sm={12}>
            <TextInputBase
              dataObject={gitToolModel}
              setDataObject={setGitToolModel}
              fieldName={"url"}
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
            <GitlabTwoFactorAuthenticationBooleanToggleInput
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

CreateWorkflowWizardCreateGitlabToolEditorPanel.propTypes = {
  gitToolModel: PropTypes.object,
  setGitToolModel: PropTypes.func,
  gitToolId: PropTypes.string,
  setGitToolId: PropTypes.func,
  onSuccessFunction: PropTypes.func,
  className: PropTypes.string,
  backButtonFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
};


