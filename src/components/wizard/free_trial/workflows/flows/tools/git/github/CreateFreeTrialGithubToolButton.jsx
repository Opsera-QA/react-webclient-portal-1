import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import CreateButton from "components/common/buttons/saving/CreateButton";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function CreateFreeTrialGithubToolButton(
  {
    onSuccessFunction,
    gitToolModel,
    setGitToolId,
    gitToolId,
    customLabel,
    icon,
    variant,
    currentCount,
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
      const currentToolCount = DataParsingHelper.parseInteger(currentCount, 0);
      const newTool = {
        name: `Github Tool ${currentToolCount + 1}`,
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
    onSuccessFunction();
  };

  return (
    <CreateButton
      showSuccessToasts={false}
      customLabel={customLabel}
      icon={icon}
      variant={variant}
      createRecord={handleGitToolCreation}
      recordDto={gitToolModel}
      addAnotherOption={false}
      disable={gitToolModel?.checkCurrentValidity() !== true}
    />
  );
}

CreateFreeTrialGithubToolButton.propTypes = {
  onSuccessFunction: PropTypes.func,
  gitToolModel: PropTypes.object,
  gitToolId: PropTypes.string,
  setGitToolId: PropTypes.func,
  icon: PropTypes.object,
  customLabel: PropTypes.string,
  variant: PropTypes.string,
  currentCount: PropTypes.number,
};


