import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import CreateButton from "components/common/buttons/saving/CreateButton";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function CreateAzureDevopsToolButton(
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
      configuration.accountPassword = await toolsActions.saveThreePartToolPasswordToVaultV3(
        getAccessToken,
        cancelTokenSource,
        toolId,
        toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS,
        "accountPassword",
        configuration?.accessToken
      );
      configuration.accessToken = await toolsActions.saveThreePartToolPasswordToVaultV3(
        getAccessToken,
        cancelTokenSource,
        toolId,
        toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS,
        "accessToken",
        configuration?.accessToken
      );

      return await toolsActions.updateToolConnectionDetails(
        getAccessToken,
        cancelTokenSource,
        toolId,
        configuration,
      );
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error, "Error Saving Azure Devops Tool Details:");
      }
    }
  };

  const handleGitToolCreation = async () => {
    let toolId = gitToolId;

    if (isMongoDbId(gitToolId) !== true) {
      const currentToolCount = DataParsingHelper.parseInteger(currentCount, 0);
      const newTool = {
        name: `Azure Devops Tool ${currentToolCount + 1}`,
        tool_identifier: toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS,
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

CreateAzureDevopsToolButton.propTypes = {
  gitToolModel: PropTypes.object,
  gitToolId: PropTypes.string,
  setGitToolId: PropTypes.func,
  onSuccessFunction: PropTypes.func,
  icon: PropTypes.object,
  customLabel: PropTypes.string,
  variant: PropTypes.string,
  currentCount: PropTypes.number,
};
