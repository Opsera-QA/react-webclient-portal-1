import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VanitySetTextInputBase from "temp-library-components/inputs/VanitySetTextInputBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import Col from "react-bootstrap/Col";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import Row from "react-bootstrap/Row";
import CreateFreeTrialGitlabToolButton
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/create_screen/gitlab/CreateFreeTrialGitlabToolButton";
import GitlabTwoFactorAuthenticationBooleanToggleInput
  from "components/inventory/tools/tool_details/tool_jobs/gitlab/GitlabTwoFactorAuthenticationBooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";

export default function CreateSalesforcePipelineWizardCreateGitlabToolEditorPanel(
  {
    gitToolModel,
    setGitToolModel,
    className,
    gitToolId,
    setGitToolId,
    setCurrentScreen,
  }) {
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
      <Row>
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
      <ButtonContainerBase>
        <CreateFreeTrialGitlabToolButton
          gitToolModel={gitToolModel}
          setCurrentScreen={setCurrentScreen}
          gitToolId={gitToolId}
          setGitToolId={setGitToolId}
        />
      </ButtonContainerBase>
    </div>
  );
}

CreateSalesforcePipelineWizardCreateGitlabToolEditorPanel.propTypes = {
  gitToolModel: PropTypes.object,
  setGitToolModel: PropTypes.func,
  gitToolId: PropTypes.string,
  setGitToolId: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};


