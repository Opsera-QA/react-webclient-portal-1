import pipelineActions from "components/workflow/pipeline-actions";
import baseActions from "utils/actionsBase";

const vaultActions = {};

vaultActions.saveRecordToVault = async (getAccessToken, cancelTokenSource, key, value) => {
  const apiUrl = `/vault`;
  const postBody = {
    key: key,
    value: value,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

vaultActions.deleteOwnerVaultRecordsForToolIdV2 = async (getAccessToken, cancelTokenSource, toolModel) => {
  const apiUrl = `/vault/tool/delete`;
  let postBody = {
    id: toolModel?.getData("_id")
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

vaultActions.deleteToolVaultKeys = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/vault/entries/tool/${toolId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

// Note: This is used for three part vault keys (tool ID, identifier, and key)
vaultActions.savePasswordToVault = async (toolData, toolConfigurationData, fieldName, value, getAccessToken) => {
  if (toolConfigurationData.isChanged(fieldName) && value != null && typeof(value) === "string") {
    const toolId = toolData.getData("_id");
    const toolIdentifier = toolData.getData("tool_identifier");
    const keyName = `${toolId}-${toolIdentifier}-${fieldName}`;
    const body = { "key": `${keyName}`, "value": value, "toolId": toolId };
    const response = await pipelineActions.saveToolRegistryRecordToVault(body, getAccessToken);
    return response?.status === 200 ? { name: "Vault Secured Key", vaultKey: keyName } : {};
  }

  // Faseeh says all vault values MUST be objects and not strings
  let currentValue = toolConfigurationData.getData(fieldName);
  return typeof currentValue === "string" ? {} : currentValue;
};

// Note: This is used for three part vault keys (tool ID, identifier, and key)
vaultActions.saveThreePartToolPasswordToVaultV2 = async (getAccessToken, cancelTokenSource, toolData, toolConfigurationData, fieldName, value) => {
  if (toolConfigurationData.isChanged(fieldName) && value != null && typeof(value) === "string") {
    const toolId = toolData.getData("_id");
    const toolIdentifier = toolData?.getData("tool_identifier");
    const keyName = `${toolId}-${toolIdentifier}-${fieldName}`;
    const postBody = {
      key: keyName,
      value: value,
      toolId: toolId
    };

    const apiUrl = "/vault/tool/";
    const response = await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
    return response?.status === 200 ? { name: "Vault Secured Key", vaultKey: keyName } : {};
  }

  // Faseeh says all vault values MUST be objects and not strings
  let currentValue = toolConfigurationData.getData(fieldName);
  return typeof currentValue === "string" ? {} : currentValue;
};

vaultActions.saveKeyPasswordToVault = async (toolConfigurationData, fieldName, value, key, getAccessToken, toolId) => {
  if (toolConfigurationData.isChanged(fieldName) && value != null && typeof(value) === "string") {
    const body = { "key": key, "value": value, "toolId": toolId };
    const response = await pipelineActions.saveToolRegistryRecordToVault(body, getAccessToken);
    return response?.status === 200 ? { name: "Vault Secured Key", vaultKey: key } : {};
  }

  // Faseeh says all values MUST be objects and not strings
  let currentValue = toolConfigurationData.getData(fieldName);
  return typeof currentValue === "string" ? {} : currentValue;
};

export default vaultActions;
