import baseActions from "utils/actionsBase";

const argoActions = {};

argoActions.getArgoToolApplicationsV2 = async (getAccessToken, cancelTokenSource, toolID) => {
  const apiUrl = `/tools/${toolID}/argo/v2/tool-applications`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

argoActions.createArgoApplicationV2 = async (getAccessToken, cancelTokenSource, toolId, argoApplicationModel) => {
  const apiUrl = `/tools/${toolId}/argo/v2/create`;
  const postBody = {
    ...argoApplicationModel.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};


argoActions.updateArgoApplicationV2 = async (getAccessToken, cancelTokenSource, toolId, applicationId, argoApplicationModel) => {
  const apiUrl = `/tools/${toolId}/argo/v2/${applicationId}/update`;
  const postBody = {
    ...argoApplicationModel.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.deleteArgoApplicationV2 = async (getAccessToken, cancelTokenSource, toolId, applicationId) => {
  const apiUrl = `/tools/${toolId}/argo/v2/${applicationId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

argoActions.getArgoClustersV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/argo/v2/clusters`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

argoActions.getArgoProjectsV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/argo/v2/projects`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

argoActions.getArgoApplicationsV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/argo/v2/applications`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

argoActions.createArgoRepository = async (getAccessToken, cancelTokenSource, toolId, argoRepositoryModel) => {
  const apiUrl = `/tools/${toolId}/argo/repo/create`;
  const postBody = {
    ...argoRepositoryModel.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.updateArgoRepository = async (getAccessToken, cancelTokenSource, toolId, repoId, argoRepositoryModel) => {
  const apiUrl = `/tools/${toolId}/argo/repo/${repoId}/update`;
  const postBody = {
    ...argoRepositoryModel.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.deleteArgoRepository = async (getAccessToken, cancelTokenSource, toolId, repoId) => {
  const apiUrl = `/tools/${toolId}/argo/repo/${repoId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

argoActions.getArgoRepositories = async (getAccessToken, cancelTokenSource, argoToolId) => {
  const apiUrl = `/tools/${argoToolId}/argo/repositories`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

argoActions.createArgoProject = async (getAccessToken, cancelTokenSource, toolId, argoRepositoryModel) => {
  const apiUrl = `/tools/${toolId}/argo/project/create`;
  const postBody = {
    ...argoRepositoryModel.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.updateArgoProject = async (getAccessToken, cancelTokenSource, toolId, projId, argoRepositoryModel) => {
  const apiUrl = `/tools/${toolId}/argo/project/${projId}/update`;
  const postBody = {
    ...argoRepositoryModel.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.deleteArgoProject = async (getAccessToken, cancelTokenSource, toolId, projId) => {
  const apiUrl = `/tools/${toolId}/argo/project/${projId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

argoActions.createArgoCluster = async (getAccessToken, cancelTokenSource, toolId, argoClusterModel) => {
  const apiUrl = `/tools/${toolId}/clusters/argo/create`;
  const postBody = {
    ...argoClusterModel.getPersistData()
  };
  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.deleteArgoCluster = async (getAccessToken, cancelTokenSource, toolId, argoClusterModel) => {
  const apiUrl = `/tools/${toolId}/clusters/argo/delete`;
  const postBody = {
    ...argoClusterModel.getPersistData()
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.getAwsEksClusters = async (getAccessToken, cancelTokenSource, toolId, clusterType) => {
  let urlParams = {
    toolId: toolId
  };
  const apiUrl = `/tools/aws/v2/eks/clusters`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

export default argoActions;
