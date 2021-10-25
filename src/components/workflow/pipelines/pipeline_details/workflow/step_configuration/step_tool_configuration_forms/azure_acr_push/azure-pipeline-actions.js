import baseActions from "utils/actionsBase";

// TODO: Pass the Tool ID to Node and pull this off of objects instead of being required to pass it all to node
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

azurePipelineActions.getAzureRepositories = async (getAccessToken, cancelTokenSource, acrLoginUrl, config) => {
  const owner = config?.owner;
  const cfg = config?.configuration;
  const postBody = {
      "owner": owner, 
      // "clientId": applicationData?.clientId?.vaultKey,
      // "clientSecret": applicationData?.clientSecret?.vaultKey, 
      "clientId": cfg?.applicationId?.vaultKey,
      "clientSecret": cfg?.applicationPassword?.vaultKey,
      "acrLoginUrl": acrLoginUrl
    } ;
    const apiURL = `tools/azure/acr/repositoryList`;
    return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
  };

export default azurePipelineActions;
