import baseActions from "utils/actionsBase";

const azureActions = {};

azureActions.createAzureCredential = async (getAccessToken, cancelTokenSource, toolId, azureApplicationModel) => {
  const apiUrl = `/tools/${toolId}/azure/create`;
  const postBody = {
    ...azureApplicationModel,
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};


azureActions.updateAzureCredential = async (getAccessToken, cancelTokenSource, toolId, applicationId, azureApplicationModel) => {
  const apiUrl = `/tools/${toolId}/azure/${applicationId}/update`;
  const postBody = {
    ...azureApplicationModel
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

azureActions.deleteAzureCredential = async (getAccessToken, cancelTokenSource, toolId, applicationId) => {
  const apiUrl = `/tools/${toolId}/azure/${applicationId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

azureActions.createAzureStorageCredential = async (getAccessToken, cancelTokenSource, toolId, azureStorageModel) => {
  const apiUrl = `/tools/${toolId}/azure/storage/create`;
  const postBody = {
    ...azureStorageModel,
  };
  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

azureActions.deleteAzureStorageCredential = async (getAccessToken, cancelTokenSource, toolId, azureStorageModel) => {
  const apiUrl = `/tools/${toolId}/azure/storage?storageName=${azureStorageModel.storageName}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

azureActions.getAzureStorageAccountsList = async (toolId, getAccessToken, cancelTokenSource) => {
  const urlParams = {
    params: {
      toolId: toolId,
    },
  };

  const apiUrl = `/tools/${toolId}/azure/storage/accounts`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

azureActions.getAzureStorageDetails = async (toolId, storageName, getAccessToken, cancelTokenSource) => {
  const urlParams = {
    params: {
      storageName: storageName
    },
  };

  const apiUrl = `/tools/${toolId}/storage`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

export default azureActions;