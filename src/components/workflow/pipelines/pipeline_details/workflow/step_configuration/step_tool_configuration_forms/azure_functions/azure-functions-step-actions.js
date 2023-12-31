import baseActions from "utils/actionsBase";

const azureFunctionsActions = {};

// TODO: Should we be calling a generic azure functions file and just passing the required fields?
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
    "region": dataObject?.getData("azureRegion")
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
    "region": dataObject?.getData("azureRegion")
  };
  const apiURL = `tools/azure/management/kubeVersions`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

azureFunctionsActions.getApplicationType = async (getAccessToken, cancelTokenSource, azureToolData, applicationData) => {
  const apiURL = `tools/azure/functions/applicationType`;
  const azureToolConfiguration = azureToolData?.configuration;
  const applicationConfiguration = applicationData?.configuration;

  const postBody = {
    owner: azureToolData?.owner,
    clientId: applicationConfiguration?.clientId?.vaultKey,
    clientSecret: applicationConfiguration?.clientSecret?.vaultKey,
    tenantId: azureToolConfiguration?.azureTenantId,
    subscriptionId: azureToolConfiguration?.azureSubscriptionId,
    resource: applicationConfiguration?.resource,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

azureFunctionsActions.getAzureResourceGroups = async (getAccessToken, cancelTokenSource, config, applicationData) => {
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

azureFunctionsActions.getAzureFunctions = async (getAccessToken, cancelTokenSource, config, applicationData, resourceGroup) => {
  const apiUrl = `tools/azure/functions/listFunctions`;
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



export default azureFunctionsActions;