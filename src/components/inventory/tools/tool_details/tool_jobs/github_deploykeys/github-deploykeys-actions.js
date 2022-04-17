import baseActions from "utils/actionsBase";

const githubDeployKeysActions = {};

githubDeployKeysActions.createGithubDeployKey = async (getAccessToken, cancelTokenSource, toolId, githubDeployKeyModel) => {
  const apiUrl = `/tools/${toolId}/github/repo/create`;
  const postBody = {
    ...githubDeployKeyModel.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

githubDeployKeysActions.updateGithubDeployKey = async (getAccessToken, cancelTokenSource, toolId, repoId, githubDeployKeyModel) => {
  const apiUrl = `/tools/${toolId}/github/repo/${repoId}/update`;
  const postBody = {
    ...githubDeployKeyModel.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

githubDeployKeysActions.deleteGithubDeployKey = async (getAccessToken, cancelTokenSource, toolId, repoId) => {
  const apiUrl = `/tools/${toolId}/github/repo/${repoId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default githubDeployKeysActions;
