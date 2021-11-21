import baseActions from "utils/actionsBase";

const jFrogToolRepositoriesActions = {};

jFrogToolRepositoriesActions.getMavenRepositories = async (getAccessToken, cancelTokenSource, toolId,) => {
  const apiUrl = `/tools/${toolId}/jfrog/repositories/maven`;
  return await baseActions.apiGetCallV2(getAccessToken,cancelTokenSource, apiUrl);
};

jFrogToolRepositoriesActions.getDockerRepositories = async (getAccessToken, cancelTokenSource, toolId,) => {
  const apiUrl = `/tools/${toolId}/jfrog/repositories/docker`;
  return await baseActions.apiGetCallV2(getAccessToken,cancelTokenSource, apiUrl);
};

jFrogToolRepositoriesActions.createRepository = async (postBody, getAccessToken, cancelTokenSource) => {
  const apiUrl = '/tools/jfrog/repositories/createRepository';
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

jFrogToolRepositoriesActions.updateRepository = async (postBody, getAccessToken, cancelTokenSource) => {
  const apiUrl = '/tools/jfrog/repositories/updateRepository';
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

jFrogToolRepositoriesActions.deleteRepository = async (postBody, getAccessToken, cancelTokenSource) => {
  const apiUrl = '/tools/jfrog/repositories/deleteRepository';
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default jFrogToolRepositoriesActions;
