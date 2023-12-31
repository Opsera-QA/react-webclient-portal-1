import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import CreateButton from "components/common/buttons/saving/CreateButton";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function CreateFreeTrialSalesforceToolButton(
  {
    onSuccessFunction,
    salesforceToolModel,
    setSalesforceToolId,
    salesforceToolId,
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
    const configuration = salesforceToolModel?.getPersistData();

    const clientIdVaultKey = `${toolId}-${toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR}-client_id`;
    configuration.sfdc_client_id = await toolsActions.saveToolValueToVaultV2(
      getAccessToken,
      cancelTokenSource,
      toolId,
      clientIdVaultKey,
      configuration?.sfdc_client_id,
    );

    const clientSecretVaultKey = `${toolId}-${toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR}-client_secret`;
    configuration.sfdc_client_secret = await toolsActions.saveToolValueToVaultV2(
      getAccessToken,
      cancelTokenSource,
      toolId,
      clientSecretVaultKey,
      configuration?.sfdc_client_secret,
    );

    const passwordVaultKey = `${toolId}-${toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR}-password`;
    configuration.sfdc_password = await toolsActions.saveToolValueToVaultV2(
      getAccessToken,
      cancelTokenSource,
      toolId,
      passwordVaultKey,
      configuration?.sfdc_password,
    );

    const tokenVaultKey = `${toolId}-${toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR}-token`;
    configuration.sfdc_token = await toolsActions.saveToolValueToVaultV2(
      getAccessToken,
      cancelTokenSource,
      toolId,
      tokenVaultKey,
      configuration?.sfdc_token,
    );
    configuration.buildType = "sfdx"; // by default make it to have sfdx

    return await toolsActions.updateToolConnectionDetails(
      getAccessToken,
      cancelTokenSource,
      toolId,
      configuration,
    );
  };

  const handleToolCreation = async () => {
    let toolId = salesforceToolId;

    if (isMongoDbId(salesforceToolId) !== true) {
      const currentToolCount = DataParsingHelper.parseInteger(currentCount, 0);
      const newTool = {
        name: `Salesforce Tool ${currentToolCount + 1}`,
        tool_identifier: toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR,
        tool_type_identifier: "sfdc-type",
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
    setSalesforceToolId(toolId);

    onSuccessFunction();
  };

  return (
    <CreateButton
      showSuccessToasts={false}
      addAnotherOption={false}
      customLabel={customLabel}
      variant={variant}
      icon={icon}
      createRecord={handleToolCreation}
      recordDto={salesforceToolModel}
      disable={salesforceToolModel?.checkCurrentValidity() !== true}
    />
  );
}

CreateFreeTrialSalesforceToolButton.propTypes = {
  onSuccessFunction: PropTypes.func,
  salesforceToolModel: PropTypes.object,
  salesforceToolId: PropTypes.string,
  setSalesforceToolId: PropTypes.func,
  icon: PropTypes.object,
  customLabel: PropTypes.string,
  variant: PropTypes.string,
  currentCount: PropTypes.number,
};


