import baseActions from "utils/actionsBase";

// TODO: Delete this file if unnecessary
export const azureFunctionsActions = {};

azureFunctionsActions.getAzureRegions = async (getAccessToken, cancelTokenSource, azureToolData, applicationData) => {
  const apiURL = `tools/azure/management/regions`;
  const azureToolConfiguration = azureToolData?.configuration;
  const azureApplicationConfiguration = applicationData?.configuration;

  console.log(applicationData);

  const postBody = {
    owner: azureToolData?.owner,
    clientId: azureApplicationConfiguration?.clientId?.vaultKey,
    clientSecret: azureApplicationConfiguration?.clientSecret?.vaultKey,
    tenantId: azureToolConfiguration?.azureTenantId,
    subscriptionId: azureToolConfiguration?.azureSubscriptionId,
    resource: azureApplicationConfiguration?.resource,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

azureFunctionsActions.getAzureClusters = async (getAccessToken, cancelTokenSource, config, applicationData) => {
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

azureFunctionsActions.getAzureResourceGroups = async (getAccessToken, cancelTokenSource, config, applicationData, clusterName) => {
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

azureFunctionsActions.getAzureStorageAccounts = async (getAccessToken, cancelTokenSource, config, applicationData, resourceGroup) => {
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

azureFunctionsActions.getAzureContainers = async (getAccessToken, cancelTokenSource, config, applicationData, storageName, resourceGroup) => {
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

export default azureFunctionsActions;