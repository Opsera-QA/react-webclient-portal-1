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

helmStepActions.getAwsNamespaces = async (getAccessToken, cancelTokenSource, awsToolConfigId, clusterName) => {
  
  let urlParams = {
    awsToolConfigId: awsToolConfigId,
    clusterName: clusterName,
  };
  const apiURL = `tools/helm/aws/namespace?awsToolConfigId=${awsToolConfigId}&clusterName=${clusterName}`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiURL,
    urlParams,
  );
};

helmStepActions.getAzureContainers = async (getAccessToken, cancelTokenSource, clusterName, clusterType, azureToolConfigId, azureCredentialId, resourceGroup) => {
  const apiUrl = `tools/helm/azure/namespace`;
  const postBody = {
    clusterName, 
    clusterType, 
    azureToolConfigId, 
    azureCredentialId, 
    resourceGroup
  };

return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default helmStepActions;