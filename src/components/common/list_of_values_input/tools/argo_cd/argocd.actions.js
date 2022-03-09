import baseActions from "utils/actionsBase";

export const argoCdActions = {};

argoCdActions.getArtifactoryTagsFromArgoInstance = async (getAccessToken, cancelTokenSource, pipelineId, stepId, toolIdentifier) => {
  const apiUrl = "/tools/argo/artifactory-tags";
  const postBody = {
    pipelineId: pipelineId,
    stepId: stepId,
    toolIdentifier: toolIdentifier,
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoCdActions.getAzureArtifactoryTagsFromArgoInstance = async (getAccessToken, cancelTokenSource, azureToolConfigId, acrLoginUrl, acrRepoName) => {
  const apiUrl = "/tools/argo/artifactory-tags/azure";
  const postBody = {
    azureToolConfigId: azureToolConfigId,
    acrLoginUrl: acrLoginUrl,
    acrRepoName: acrRepoName,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoCdActions.getArgoRepositoriesV2 = async (getAccessToken, cancelTokenSource, argoToolId) => {
  const apiUrl = `/tools/${argoToolId}/argo/repositories`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};