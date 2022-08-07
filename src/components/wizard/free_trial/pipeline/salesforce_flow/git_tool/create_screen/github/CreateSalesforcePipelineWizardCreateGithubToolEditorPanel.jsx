import React, {useState} from "react";
import PropTypes from "prop-types";
import VanitySetTextInputBase from "temp-library-components/inputs/VanitySetTextInputBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import Col from "react-bootstrap/Col";
import GithubTwoFactorAuthenticationBooleanToggleInput from "components/inventory/tools/tool_details/tool_jobs/github/GithubTwoFactorAuthenticationBooleanToggleInput";
import modelHelpers from "components/common/model/modelHelpers";
import githubConnectionMetadata
  from "components/inventory/tools/tool_details/tool_jobs/github/github-connection-metadata";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import CreateFreeTrialGithubToolButton
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/create_screen/github/CreateFreeTrialGithubToolButton";
import Row from "react-bootstrap/Row";

export default function CreateSalesforcePipelineWizardCreateGithubToolEditorPanel(
  {
    className,
    setGitToolId,
    setCurrentScreen,
  }) {
  const [githubToolCreationModel, setGithubToolCreationModel] = useState({...modelHelpers.getNewModelForMetadata(githubConnectionMetadata)});

  const getDynamicFields = () => {
    if (githubToolCreationModel?.getData("twoFactorAuthentication") === true) {
      return (
        <div>
          <VaultTextInput
            dataObject={githubToolCreationModel}
            setDataObject={setGithubToolCreationModel}
            fieldName={"secretPrivateKey"}
          />
          <VaultTextInput
            dataObject={githubToolCreationModel}
            setDataObject={setGithubToolCreationModel}
            fieldName={"secretAccessTokenKey"}
          />
        </div>
      );
    }

    return (
      <VaultTextInput
        dataObject={githubToolCreationModel}
        setDataObject={setGithubToolCreationModel}
        fieldName={"accountPassword"}
      />
    );
  };


  return (
    <div className={className}>
      <Row>
        <Col sm={12}>
          <VanitySetTextInputBase
            fieldName={"accountUsername"}
            model={githubToolCreationModel}
            setModel={setGithubToolCreationModel}
          />
        </Col>
        <Col sm={12}>
          <GithubTwoFactorAuthenticationBooleanToggleInput
            model={githubToolCreationModel}
            setModel={setGithubToolCreationModel}
          />
        </Col>
        <Col sm={12}>
          {getDynamicFields()}
        </Col>
      </Row>
      <ButtonContainerBase>
        <CreateFreeTrialGithubToolButton
          githubToolCreationModel={githubToolCreationModel}
          setCurrentScreen={setCurrentScreen}
          setGitToolId={setGitToolId}
        />
      </ButtonContainerBase>
    </div>
  );
}

CreateSalesforcePipelineWizardCreateGithubToolEditorPanel.propTypes = {
  setGitToolId: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};


