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