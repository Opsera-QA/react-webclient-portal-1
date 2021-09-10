import baseActions from "utils/actionsBase";

const azureFunctionsActions = {};


azureFunctionsActions.getAzureRegions = async (getAccessToken, cancelTokenSource, config, applicationData) => {
  const cfg = config?.configuration;
  const owner = config?.owner;
  const postBody = {
    "owner": owner,
    "clientId": applicationData?.clientId?.vaultKey,
    "clientSecret": applicationData?.clientSecret?.vaultKey,
    "tenantId": cfg?.azureTenantId,
    "subscriptionId": cfg?.azureSubscriptionId,
    "resource": applicationData?.resource
  };
  const apiURL = `tools/azure/management/regions`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

azureFunctionsActions.getAzureMachineTypes = async (getAccessToken, cancelTokenSource, config, applicationData, dataObject) => {
  const cfg = config?.configuration;
  const owner = config?.owner;
  const postBody = {
    "owner": owner,
    "clientId": applicationData?.clientId?.vaultKey,
    "clientSecret": applicationData?.clientSecret?.vaultKey,
    "tenantId": cfg?.azureTenantId,
    "subscriptionId": cfg?.azureSubscriptionId,
    "resource": applicationData?.resource,
    "region": dataObject?.getData("region")
  };
  const apiURL = `tools/azure/management/machineTypes`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

azureFunctionsActions.getKubeVersions = async (getAccessToken, cancelTokenSource, config, applicationData, dataObject) => {
  const cfg = config?.configuration;
  const owner = config?.owner;
  const postBody = {
    "owner": owner,
    "clientId": applicationData?.clientId?.vaultKey,
    "clientSecret": applicationData?.clientSecret?.vaultKey,
    "tenantId": cfg?.azureTenantId,
    "subscriptionId": cfg?.azureSubscriptionId,
    "resource": applicationData?.resource,
    "region": dataObject?.getData("region")
  };
  const apiURL = `tools/azure/management/kubeVersions`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

azureFunctionsActions.getApplicationType = async (getAccessToken, cancelTokenSource, config, applicationData) => {
  const cfg = config?.configuration;
  const owner = config?.owner;
  const postBody = {
    "owner": owner,
    "clientId": applicationData?.clientId?.vaultKey,
    "clientSecret": applicationData?.clientSecret?.vaultKey,
    "tenantId": cfg?.azureTenantId,
    "subscriptionId": cfg?.azureSubscriptionId,
    "resource": applicationData?.resource,
  };
  const apiURL = `tools/azure/functions/applicationType`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};



export default azureFunctionsActions;