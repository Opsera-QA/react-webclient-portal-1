import baseActions from "utils/actionsBase";

// TODO: This should be moved to where the inputs are. It's not ArgoCD step specific
const ArgoCDStepActions = {};

ArgoCDStepActions.getArtifactoryTagsFromArgoInstance = async (getAccessToken, cancelTokenSource, pipelineId, stepId, toolIdentifier) => {
  const apiUrl = "/tools/argo/artifactory-tags";
  const postBody = {
    pipelineId: pipelineId,
    stepId: stepId,
    toolIdentifier: toolIdentifier,
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

ArgoCDStepActions.getAzureArtifactoryTagsFromArgoInstance = async (getAccessToken, cancelTokenSource, azureToolConfigId, acrLoginUrl, acrRepoName) => {
  const apiUrl = "/tools/argo/artifactory-tags/azure";
  const postBody = {
    azureToolConfigId: azureToolConfigId,
    acrLoginUrl: acrLoginUrl,
    acrRepoName: acrRepoName,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default ArgoCDStepActions;
