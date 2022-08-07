import React, {useState} from "react";
import PropTypes from "prop-types";
import VanitySetTextInputBase from "temp-library-components/inputs/VanitySetTextInputBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import Col from "react-bootstrap/Col";
import GithubTwoFactorToggle from "components/inventory/tools/tool_details/tool_jobs/github/GithubTwoFactorToggle";
import modelHelpers from "components/common/model/modelHelpers";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import CreateFreeTrialGithubToolButton
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/create_screen/github/CreateFreeTrialGithubToolButton";
import Row from "react-bootstrap/Row";
import gitlabConnectionMetadata
  from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab-connection-metadata";
import CreateFreeTrialGitlabToolButton
  from "components/wizard/free_trial/pipeline/salesforce_flow/git_tool/create_screen/gitlab/CreateFreeTrialGitlabToolButton";

export default function CreateSalesforcePipelineWizardCreateGitlabToolEditorPanel(
  {
    className,
    setGitToolId,
    setCurrentScreen,
  }) {
  const [gitlabToolCreationModel, setGitlabToolCreationModel] = useState({...modelHelpers.getNewModelForMetadata(gitlabConnectionMetadata)});

  const getDynamicFields = () => {
    if (gitlabToolCreationModel?.getData("twoFactorAuthentication") === true) {
      return (
        <div>
          <VaultTextInput
            dataObject={gitlabToolCreationModel}
            setDataObject={setGitlabToolCreationModel}
            fieldName={"secretPrivateKey"}
          />
          <VaultTextInput
            dataObject={gitlabToolCreationModel}
            setDataObject={setGitlabToolCreationModel}
            fieldName={"secretAccessTokenKey"}
          />
        </div>
      );
    }

    return (
      <VaultTextInput
        dataObject={gitlabToolCreationModel}
        setDataObject={setGitlabToolCreationModel}
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
            model={gitlabToolCreationModel}
            setModel={setGitlabToolCreationModel}
          />
        </Col>
        <Col sm={12}>
          <GithubTwoFactorToggle
            dataObject={gitlabToolCreationModel}
            setDataObject={setGitlabToolCreationModel}
            fieldName={"twoFactorAuthentication"}
          />
        </Col>
        <Col sm={12}>
          {getDynamicFields()}
        </Col>
      </Row>
      <ButtonContainerBase>
        <CreateFreeTrialGitlabToolButton
          githubToolCreationModel={gitlabToolCreationModel}
          setCurrentScreen={setCurrentScreen}
          setGitToolId={setGitToolId}
        />
      </ButtonContainerBase>
    </div>
  );
}

CreateSalesforcePipelineWizardCreateGitlabToolEditorPanel.propTypes = {
  setGitToolId: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};


