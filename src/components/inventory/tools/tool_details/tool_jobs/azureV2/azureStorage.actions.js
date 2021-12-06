import baseActions from "utils/actionsBase";

const azureStorageActions = {};

azureStorageActions.createAzureToolStorageAccount = async (getAccessToken, cancelTokenSource, toolId, azureStorageAccountsModel) => {
  const apiUrl = `/tools/${toolId}/azure/storage/account/create`;
  const postBody = {
    ...azureStorageAccountsModel.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

azureStorageActions.deleteAzureToolStorageAccount = async (getAccessToken, cancelTokenSource, toolId, storageAccountName) => {
  console.log(storageAccountName);
  const apiUrl = `/tools/${toolId}/azure/storage/account/${storageAccountName}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

azureStorageActions.getAzureToolStorageAccounts = async ( getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/azure/storage/accounts`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

azureStorageActions.updateAzureToolStorageAccount = async (getAccessToken, cancelTokenSource, toolId, azureStorageAccountsModel, currentAzureStorageAccountName, newAzureStorageAccountName, newAzureStorageAccountToken) => {
  const apiUrl = `/tools/${toolId}/azure/storage/account/update`;
  const postBody = {
    newAzureStorageAccountName: azureStorageAccountsModel?.getData("storageAccountName"),
    newAzureStorageAccountToken: azureStorageAccountsModel?.getData("azureStorageAccountToken"),
    currentAzureStorageAccountName
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default azureStorageActions;