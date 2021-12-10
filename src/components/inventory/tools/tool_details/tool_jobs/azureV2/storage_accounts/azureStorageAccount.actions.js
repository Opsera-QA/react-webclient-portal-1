import baseActions from "utils/actionsBase";

const azureStorageAccountActions = {};

azureStorageAccountActions.createAzureToolStorageAccount = async (getAccessToken, cancelTokenSource, toolId, azureStorageAccountsModel) => {
  const apiUrl = `/tools/${toolId}/azure/storage/account/create`;
  const postBody = {
    ...azureStorageAccountsModel.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

azureStorageAccountActions.deleteAzureToolStorageAccount = async (getAccessToken, cancelTokenSource, toolId, storageAccountName) => {
  const apiUrl = `/tools/${toolId}/azure/storage/account/${storageAccountName}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

azureStorageAccountActions.getAzureToolStorageAccounts = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/azure/storage/accounts`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

azureStorageAccountActions.updateAzureToolStorageAccount = async (getAccessToken, cancelTokenSource, toolId, azureStorageAccountsModel, currentAzureStorageAccountName) => {
  const apiUrl = `/tools/${toolId}/azure/storage/account/update/${currentAzureStorageAccountName}`;
  const postBody = {
    newAzureStorageAccountToken: azureStorageAccountsModel?.getData("azureStorageAccountToken"),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default azureStorageAccountActions;