import baseActions from "utils/actionsBase";
const helmStepActions = {};

helmStepActions.getAzureClusters = async (getAccessToken, cancelTokenSource, config, applicationData) => {
  const apiUrl = `tools/azure/management/clusterNames`;
  const cfg = config?.configuration;
  const owner = config?.owner;
  const postBody = {
    "owner": owner,
    "clientId": applicationData?.clientId?.vaultKey,
    "clientSecret": applicationData?.clientSecret?.vaultKey,
    "tenantId": cfg?.azureTenantId,
    "subscriptionId": cfg?.azureSubscriptionId,
    "resource": applicationData?.resource,
    "type": "v2"
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

helmStepActions.getAzureResourceGroups = async (getAccessToken, cancelTokenSource, config, applicationData, clusterName) => {
  const apiUrl = `tools/azure/management/resourceGroups`;
  const cfg = config?.configuration;
  const owner = config?.owner;
  const postBody = {
    "owner": owner,
    "clientId": applicationData?.clientId?.vaultKey,
    "clientSecret": applicationData?.clientSecret?.vaultKey,
    "tenantId": cfg?.azureTenantId,
    "subscriptionId": cfg?.azureSubscriptionId,
    "resource": applicationData?.resource,
    "type" : "v2"
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

helmStepActions.getAzureStorageAccounts = async (getAccessToken, cancelTokenSource, config, applicationData, resourceGroup) => {
  const apiUrl = `tools/azure/management/storageAccountsByRG`;
  const cfg = config?.configuration;
  const owner = config?.owner;
  const postBody = {
    "owner": owner,
    "clientId": applicationData?.clientId?.vaultKey,
    "clientSecret": applicationData?.clientSecret?.vaultKey,
    "tenantId": cfg?.azureTenantId,
    "subscriptionId": cfg?.azureSubscriptionId,
    "resource": applicationData?.resource,
    resourceGroup: resourceGroup
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

helmStepActions.getAzureContainers = async (getAccessToken, cancelTokenSource, config, applicationData, storageName, resourceGroup) => {
    const apiUrl = `tools/azure/management/storageContainers`;
    const cfg = config?.configuration;
    const owner = config?.owner;
    const postBody = {
      "owner": owner,
      "clientId": applicationData?.clientId?.vaultKey,
      "clientSecret": applicationData?.clientSecret?.vaultKey,
      "tenantId": cfg?.azureTenantId,
      "subscriptionId": cfg?.azureSubscriptionId,
      "resource": applicationData?.resource,
      "storageAccountName" : storageName,
      "resourceGroup":resourceGroup
    };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default helmStepActions;