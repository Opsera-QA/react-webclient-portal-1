import baseActions from "utils/actionsBase";

// TODO: Pass the Tool ID to Node and pull this off of objects instead of being required to pass it all to node
const azurePipelineActions = {};

azurePipelineActions.getAzureRegistries = async (
  getAccessToken,
  cancelTokenSource,
  config,
  resource,
  service,
  applicationData
) => {
  const cfg = config?.configuration;
  const owner = config?.owner;

  const postBody = {
    owner: owner,
    clientId: service === "azure" ? applicationData?.configuration?.clientId?.vaultKey : cfg?.applicationId?.vaultKey,
    clientSecret:
      service === "azure" ? applicationData?.configuration?.clientSecret?.vaultKey : cfg?.applicationPassword?.vaultKey,
    tenantId: service === "azure" ? cfg?.azureTenantId : cfg?.tenantId?.vaultKey,
    subscriptionId: service === "azure" ? cfg?.azureSubscriptionId : cfg?.subscriptionId?.vaultKey,
    resource: resource,
    type: service === "azure" ? "v2" : undefined,
  };
  const apiURL = `tools/azure/acr/registryList`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

azurePipelineActions.getAzureRepositories = async (
  getAccessToken,
  cancelTokenSource,
  acrLoginUrl,
  config,
  service,
  applicationData
) => {
  const owner = config?.owner;
  const cfg = config?.configuration;
  const postBody = {
    owner: owner,
    clientId: service === "azure" ? applicationData?.configuration?.clientId?.vaultKey : cfg?.applicationId?.vaultKey,
    clientSecret:
      service === "azure" ? applicationData?.configuration?.clientSecret?.vaultKey : cfg?.applicationPassword?.vaultKey,
    acrLoginUrl: acrLoginUrl,
    type: service === "azure" ? "v2" : undefined,
  };
  const apiURL = `tools/azure/acr/repositoryList`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

export default azurePipelineActions;
