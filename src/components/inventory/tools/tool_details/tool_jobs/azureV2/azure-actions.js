import baseActions from "utils/actionsBase";

const azureActions = {};

azureActions.createAzureCredential = async (getAccessToken, cancelTokenSource, toolId, azureApplicationModel) => {
  const apiUrl = `/tools/${toolId}/azure/create`;
  const postBody = {
    ...azureApplicationModel,
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};


azureActions.updateAzureCredential = async (getAccessToken, cancelTokenSource, toolId, applicationId, azureApplicationModel) => {
  const apiUrl = `/tools/${toolId}/azure/${applicationId}/update`;
  const postBody = {
    ...azureApplicationModel
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

azureActions.deleteAzureCredential = async (getAccessToken, cancelTokenSource, toolId, applicationId) => {
  const apiUrl = `/tools/${toolId}/azure/${applicationId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

azureActions.getRepositoriesFromAzureInstanceV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/azure-devops/${toolId}/v2/repositories`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

azureActions.getBranchesFromAzureInstanceV2 = async (getAccessToken, cancelTokenSource, toolId, repositoryId) => {
  const apiUrl = `/azure-devops/${toolId}/v2/branches`;
  const queryParams = {
    params: {
      repositoryId: repositoryId
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

azureActions.getReviewers = async (getAccessToken, cancelTokenSource, toolId, projectId) => {
  const apiUrl = `/azure-devops/${toolId}/v2/reviewers`;
  const queryParams = {
    params: {
      projectId: projectId
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

export default azureActions;
