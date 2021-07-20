import baseActions from "utils/actionsBase";

const azurePipelineActions = {};

azurePipelineActions.getAzurePipelines = async (getAccessToken, cancelTokenSource, model, userId) => {
  const vaultAccessToken = model.getData("accessToken");
  const vaultKey = vaultAccessToken?.vaultKey;

  const postBody = {
    organizationName: model?.getData("organizationName"),
    projectName: model?.getData("projectName"),
    vaultKey: vaultKey,
    userId: userId
  };

  const apiURL = `azure-devops/get-pipelines`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

azurePipelineActions.getAzureProjects = async (getAccessToken, cancelTokenSource, model, userId) => {
  const vaultAccessToken = model.getData("accessToken");
  const vaultKey = vaultAccessToken?.vaultKey;

  const postBody = {
    organizationName: model?.getData("organizationName"),
    vaultKey: vaultKey,
    userId: userId
  };

  const apiURL = `azure-devops/get-projects`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

export default azurePipelineActions;
