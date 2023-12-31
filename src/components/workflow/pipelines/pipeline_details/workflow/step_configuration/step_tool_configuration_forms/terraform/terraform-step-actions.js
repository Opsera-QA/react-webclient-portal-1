import baseActions from "utils/actionsBase";
const terraformStepActions = {};

// TODO: THis should be on an AWS-specific actions file
terraformStepActions.getIAMRoles = async (getAccessToken, cancelTokenSource, dataObject) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolConfigId")
  };
  const apiUrl = `/tools/aws/v2/IAMRoles`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

terraformStepActions.getTerraformTags = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "tools/terraform/tags";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

terraformStepActions.getAzureClusters = async (getAccessToken, cancelTokenSource, config, applicationData) => {
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

terraformStepActions.getAzureResourceGroups = async (getAccessToken, cancelTokenSource, config, applicationData, clusterName) => {
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

terraformStepActions.getAzureStorageAccounts = async (getAccessToken, cancelTokenSource, config, applicationData, resourceGroup) => {
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

terraformStepActions.getAzureContainers = async (getAccessToken, cancelTokenSource, config, applicationData, storageName, resourceGroup) => {
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

export default terraformStepActions;