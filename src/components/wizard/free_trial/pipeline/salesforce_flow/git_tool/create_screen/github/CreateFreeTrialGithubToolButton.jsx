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
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export default function CreateFreeTrialGithubToolButton(
  {
    setCurrentScreen,
    gitToolModel,
    setGitToolId,
    gitToolId,
  }) {
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  const saveConnectionDetails = async (toolId) => {
    const configuration = gitToolModel?.getPersistData();
    configuration.accountPassword = await toolsActions.saveSimpleVaultPasswordToVaultV2(
      getAccessToken,
      cancelTokenSource,
      toolId,
      toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB,
      configuration?.accountPassword,
    );
    configuration.secretPrivateKey = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolId,
      toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB,
      "secretPrivateKey",
      configuration?.secretPrivateKey,
      );
    configuration.secretAccessTokenKey = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolId,
      toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB,
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
    let toolId = gitToolId;

    if (isMongoDbId(gitToolId) !== true) {
      const newTool = {
        name: `Free Trial Github Tool`,
        tool_identifier: toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB,
        tool_type_identifier: "source",
        active: true,
      };

      const response = await toolsActions.createStandaloneTool(
        getAccessToken,
        cancelTokenSource,
        newTool,
      );

      toolId = response?.data?._id;
    }

    await saveConnectionDetails(toolId);

    setGitToolId(toolId);
    setCurrentScreen(CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.TEST_GIT_TOOL_CONNECTION_SCREEN);
  };

  return (
    <div className={"m-3"}>
      <ButtonContainerBase>
        <CreateButton
          showSuccessToasts={false}
          customLabel={"Continue"}
          createRecord={handleGitToolCreation}
          recordDto={gitToolModel}
          addAnotherOption={false}
        />
      </ButtonContainerBase>
    </div>
  );
}

CreateFreeTrialGithubToolButton.propTypes = {
  setCurrentScreen: PropTypes.func,
  gitToolModel: PropTypes.object,
  gitToolId: PropTypes.string,
  setGitToolId: PropTypes.func,
};


