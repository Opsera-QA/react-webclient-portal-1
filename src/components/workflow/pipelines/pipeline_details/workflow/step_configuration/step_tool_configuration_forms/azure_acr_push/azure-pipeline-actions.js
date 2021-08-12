import baseActions from "utils/actionsBase";

const azurePipelineActions = {};

azurePipelineActions.getAzureRegistries = async (getAccessToken, cancelTokenSource, config, resource) => {
  const cfg = config?.configuration;
  const owner = config?.owner;
  const postBody = {
    "owner": owner, 
    // "clientId": applicationData?.clientId?.vaultKey,
    // "clientSecret": applicationData?.clientSecret?.vaultKey,
    "clientId": cfg?.applicationId?.vaultKey,
    "clientSecret": cfg?.applicationPassword?.vaultKey,
    "tenantId": cfg?.tenantId?.vaultKey,
    "subscriptionId": cfg?.subscriptionId?.vaultKey, 
    "resource": resource 
  };
  const apiURL = `tools/azure/acr/registryList`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

azurePipelineActions.getAzureRepositories = async (getAccessToken, cancelTokenSource, model, config) => {
  const owner = config?.owner;
  const url = model.getData('acrLoginUrl');
  const cfg = config?.configuration;
  const postBody = {
      "owner": owner, 
      // "clientId": applicationData?.clientId?.vaultKey,
      // "clientSecret": applicationData?.clientSecret?.vaultKey, 
      "clientId": cfg?.applicationId?.vaultKey,
      "clientSecret": cfg?.applicationPassword?.vaultKey,
      "acrLoginUrl": url
    } ;
    const apiURL = `tools/azure/acr/repositoryList`;
    return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
  };

export default azurePipelineActions;
