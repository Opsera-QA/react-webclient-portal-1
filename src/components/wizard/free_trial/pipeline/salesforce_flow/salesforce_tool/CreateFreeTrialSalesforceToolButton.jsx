import React from "react";
import PropTypes from "prop-types";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import CreateButton from "components/common/buttons/saving/CreateButton";
import {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS
} from "components/wizard/free_trial/pipeline/salesforce_flow/CreateSalesforcePipelineWizard";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export default function CreateFreeTrialSalesforceToolButton(
  {
    setCurrentScreen,
    salesforceToolModel,
    setSalesforceToolId,
    salesforceToolId,
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
      const newTool = {
        name: `Free Trial Salesforce Tool`,
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
    setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.TEST_SALESFORCE_TOOL_CONNECTION_SCREEN);
  };

  return (
    <div className={"m-3"}>
      <ButtonContainerBase>
        <CreateButton
          showSuccessToasts={false}
          addAnotherOption={false}
          customLabel={"Continue"}
          createRecord={handleToolCreation}
          recordDto={salesforceToolModel}
        />
      </ButtonContainerBase>
    </div>
  );
}

CreateFreeTrialSalesforceToolButton.propTypes = {
  setCurrentScreen: PropTypes.func,
  salesforceToolModel: PropTypes.object,
  salesforceToolId: PropTypes.string,
  setSalesforceToolId: PropTypes.setSalesforceToolId,
};


