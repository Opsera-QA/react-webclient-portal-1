import baseActions from "utils/actionsBase";

const azureStorageActions = {};

azureStorageActions.createAzureToolStorageAccount = async (getAccessToken, cancelTokenSource, toolId, storageAccountName, azureStorageAccountToken) => {
  const apiUrl = `/tools/${toolId}/azure/storage/account/create`;
  const postBody = {
    toolId,
    storageAccountName,
    azureStorageAccountToken
  };
  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

azureStorageActions.deleteAzureStorageCredential = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/azure/storage/delete`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

azureStorageActions.getAzureToolStorageAccounts = async ( getAccessToken, cancelTokenSource, toolId) => {

  const apiUrl = `/tools/${toolId}/azure/storage/accounts`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

azureStorageActions.getAzureStorageDetails = async (getAccessToken, cancelTokenSource, toolId) => {
  // const urlParams = {
  //   params: {
  //     storageName: storageName
  //   },
  // };

  const apiUrl = `/tools/${toolId}/storage`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default azureStorageActions;