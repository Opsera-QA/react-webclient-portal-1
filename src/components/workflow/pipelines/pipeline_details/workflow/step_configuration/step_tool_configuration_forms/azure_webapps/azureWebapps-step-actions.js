import baseActions from "utils/actionsBase";

const azureWebappsActions = {};

azureWebappsActions.getAzureWebapps = async (getAccessToken, cancelTokenSource, config, applicationData, resourceGroup) => {
  const apiUrl = `tools/azure/webapps`;
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

azureWebappsActions.getRollbackVersions = async (getAccessToken, cancelTokenSource, pipelineId, artifactStepId, extension, artifactType) => {
  const apiUrl = "pipelines/azure-webapps/getVersions";
  const postBody = {
    pipelineId: pipelineId,
    stepId: artifactStepId,
    extension: extension,
    artifactType: artifactType,
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default azureWebappsActions;
