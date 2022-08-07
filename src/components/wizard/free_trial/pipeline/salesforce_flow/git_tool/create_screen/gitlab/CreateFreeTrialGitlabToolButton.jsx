import React from "react";
import PropTypes from "prop-types";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import CreateButton from "components/common/buttons/saving/CreateButton";
import {
  CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS
} from "components/wizard/free_trial/pipeline/salesforce_flow/CreateSalesforcePipelineWizard";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";

export default function CreateFreeTrialGitlabToolButton(
  {
    setCurrentScreen,
    gitlabToolCreationModel,
    setGitToolId,
  }) {
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  const saveConnectionDetails = async (toolId) => {
    const configuration = gitlabToolCreationModel?.getPersistData();
    configuration.accountPassword = await toolsActions.saveSimpleVaultPasswordToVaultV2(
      getAccessToken,
      cancelTokenSource,
      toolId,
      toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
      configuration?.accountPassword,
    );
    configuration.secretPrivateKey = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolId,
      toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
      "secretPrivateKey",
      configuration?.secretPrivateKey,
      );
    configuration.secretAccessTokenKey = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolId,
      toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
      "secretAccessTokenKey",
      configuration?.secretAccessTokenKey,
    );

    return await toolsActions.updateToolConnectionDetails(
      getAccessToken,
      cancelTokenSource,
      toolId,
      configuration,
    );
  };

  const handleGitToolCreation = async () => {
    const newTool = {
      name: `Free Trial Gitlab Tool`,
      toolIdentifier: toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
    };

    const response = await toolsActions.createStandaloneTool(
      getAccessToken,
      cancelTokenSource,
      newTool,
    );

    const toolId = response?._id;
    await saveConnectionDetails(toolId);

    setGitToolId(toolId);
    setCurrentScreen(CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN);
  };

  return (
    <div className={"m-3"}>
      <ButtonContainerBase>
        <CreateButton
          addAnotherOption={false}
          showSuccessToasts={false}
          customLabel={"Continue"}
          createRecord={handleGitToolCreation}
          recordDto={gitlabToolCreationModel}
        />
      </ButtonContainerBase>
    </div>
  );
}

CreateFreeTrialGitlabToolButton.propTypes = {
  setCurrentScreen: PropTypes.func,
  gitlabToolCreationModel: PropTypes.object,
  setGitToolId: PropTypes.func,
};

