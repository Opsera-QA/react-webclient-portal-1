import baseActions from "utils/actionsBase";

const azureStorageActions = {};

azureStorageActions.createAzureStorageCredential = async (getAccessToken, cancelTokenSource, toolId, azureStorageModel) => {
  const apiUrl = `/tools/${toolId}/azure/storage/create`;
  const postBody = {
    ...azureStorageModel,
  };
  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

azureStorageActions.deleteAzureStorageCredential = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/azure/storage/delete`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

azureStorageActions.getAzureStorageAccountsList = async (toolId, getAccessToken, cancelTokenSource) => {
  const urlParams = {
    params: {
      toolId: toolId,
    },
  };

  const apiUrl = `/tools/${toolId}/azure/storage/accounts`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

azureStorageActions.getAzureStorageDetails = async (toolId, storageName, getAccessToken, cancelTokenSource) => {
  const urlParams = {
    params: {
      storageName: storageName
    },
  };

  const apiUrl = `/tools/${toolId}/storage`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

export default azureStorageActions;