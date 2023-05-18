import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import CreateButton from "components/common/buttons/saving/CreateButton";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function CreateFreeTrialGitlabToolButton(
  {
    gitToolModel,
    gitToolId,
    setGitToolId,
    onSuccessFunction,
    customLabel,
    icon,
    variant,
    currentCount,
  }) {
  const {
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext
  } = useComponentStateReference();

  const saveConnectionDetails = async (toolId) => {
    try {
      const configuration = gitToolModel?.getPersistData();
      configuration.accountPassword =
        await toolsActions.saveSimpleVaultPasswordToVaultV2(
          getAccessToken,
          cancelTokenSource,
          toolId,
          toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
          configuration?.accountPassword,
        );
      configuration.secretPrivateKey =
        await toolsActions.saveThreePartToolPasswordToVaultV3(
          getAccessToken,
          cancelTokenSource,
          toolId,
          toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
          "secretPrivateKey",
          configuration?.secretPrivateKey,
        );
      configuration.secretAccessTokenKey =
        await toolsActions.saveThreePartToolPasswordToVaultV3(
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
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(
          error,
          "Error Saving Gitlab Tool Details",
        );
      }
    }
  };

  const handleGitToolCreation = async () => {
    let toolId = gitToolId;

    if (isMongoDbId(gitToolId) !== true) {
      const currentToolCount = DataParsingHelper.parseInteger(currentCount, 0);
      const newTool = {
        name: `Gitlab Tool ${currentToolCount + 1}`,
        tool_identifier: toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
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
    onSuccessFunction();
  };

  return (
    <CreateButton
      addAnotherOption={false}
      showSuccessToasts={false}
      customLabel={customLabel}
      variant={variant}
      createRecord={handleGitToolCreation}
      recordDto={gitToolModel}
      disable={gitToolModel?.checkCurrentValidity() !== true}
      icon={icon}
    />
  );
}

CreateFreeTrialGitlabToolButton.propTypes = {
  gitToolModel: PropTypes.object,
  gitToolId: PropTypes.string,
  setGitToolId: PropTypes.func,
  onSuccessFunction: PropTypes.func,
  icon: PropTypes.object,
  customLabel: PropTypes.string,
  variant: PropTypes.string,
  currentCount: PropTypes.number,
};

