import baseActions from "utils/actionsBase";

const jFrogToolRepositoriesActions = {};

jFrogToolRepositoriesActions.getMavenRepositories = async (getAccessToken, cancelTokenSource, toolId,) => {
  const apiUrl = `/tools/${toolId}/jfrog_artifactory/repositories/maven`;
  return await baseActions.apiGetCallV2(getAccessToken,cancelTokenSource, apiUrl);
};

jFrogToolRepositoriesActions.getRepositories = async (getAccessToken, cancelTokenSource, toolId, type) => {
  const apiUrl = `/tools/${toolId}/jfrog_artifactory/repositories/${type}`;
  return await baseActions.apiGetCallV2(getAccessToken,cancelTokenSource, apiUrl);
};

jFrogToolRepositoriesActions.getAllMavenRepositories = async (getAccessToken, cancelTokenSource, toolId,) => {
  const apiUrl = `/tools/${toolId}/jfrog_artifactory/tool/repositories`;
  return await baseActions.apiGetCallV2(getAccessToken,cancelTokenSource, apiUrl);
};

jFrogToolRepositoriesActions.getDockerRepositories = async (getAccessToken, cancelTokenSource, toolId,) => {
  const apiUrl = `/tools/${toolId}/jfrog_artifactory/repositories/docker`;
  return await baseActions.apiGetCallV2(getAccessToken,cancelTokenSource, apiUrl);
};

jFrogToolRepositoriesActions.createRepository = async (getAccessToken, cancelTokenSource, toolId, jfrogRepositoryModel) => {
  const apiUrl = `/tools/${toolId}/jfrog_artifactory/repositories/create`;
  const postBody = {
    ...jfrogRepositoryModel?.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

jFrogToolRepositoriesActions.updateRepository = async (getAccessToken, cancelTokenSource, toolId, jfrogRepositoryModel) => {
  const apiUrl = `/tools/${toolId}/jfrog_artifactory/repositories/update`;
  const postBody = {
    ...jfrogRepositoryModel.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

jFrogToolRepositoriesActions.deleteRepository = async (getAccessToken, cancelTokenSource, toolId, jfrogRepositoryModel) => {
  const apiUrl = `/tools/${toolId}/jfrog_artifactory/repositories/${jfrogRepositoryModel?.getData("key")}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default jFrogToolRepositoriesActions;
