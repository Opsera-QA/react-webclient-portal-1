import baseActions from "utils/actionsBase";

const argoActions = {};

// TODO: THIS COULD BE REMOVED/DEPRECATED SINCE WE ARE SYNCING THE DATA WITH ARGO TOOL
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

argoActions.deleteArgoApplicationV2 = async (getAccessToken, cancelTokenSource, toolId, applicationName) => {
  const apiUrl = `/tools/${toolId}/argo/v2/${applicationName}`;
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

argoActions.updateArgoRepository = async (getAccessToken, cancelTokenSource, toolId, argoRepositoryModel) => {
  const apiUrl = `/tools/${toolId}/argo/repo/${argoRepositoryModel?.getData("repoId")}/update`;
  const postBody = {
    ...argoRepositoryModel.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.deleteArgoRepository = async (getAccessToken, cancelTokenSource, toolId, repoId) => {
  const apiUrl = `/tools/${toolId}/argo/repo/${repoId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

argoActions.createArgoProject = async (getAccessToken, cancelTokenSource, toolId, argoRepositoryModel) => {
  const apiUrl = `/tools/${toolId}/argo/project/create`;
  const postBody = {
    ...argoRepositoryModel.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.updateArgoProject = async (getAccessToken, cancelTokenSource, toolId, argoRepositoryModel) => {
  const apiUrl = `/tools/${toolId}/argo/project/${argoRepositoryModel?.getData("projId")}/update`;
  const postBody = {
    ...argoRepositoryModel.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.deleteArgoProject = async (getAccessToken, cancelTokenSource, toolId, projectId) => {
  const apiUrl = `/tools/${toolId}/argo/project/${projectId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

argoActions.createArgoCluster = async (getAccessToken, cancelTokenSource, toolId, argoClusterModel) => {
  const apiUrl = `/tools/${toolId}/argo/v2/clusters/create`;
  const postBody = {
    ...argoClusterModel.getPersistData()
  };
  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.deleteArgoCluster = async (getAccessToken, cancelTokenSource, toolId, argoClusterModel) => {
  const apiUrl = `/tools/${toolId}/argo/v2/clusters/delete`;
  const postBody = {
    clusterName: argoClusterModel?.getData("clusterName"),
    server: argoClusterModel?.getData("server"),
    platform: argoClusterModel?.getData("platform"),
    platformToolId: argoClusterModel?.getData("platformToolId"),
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

argoActions.getIamAwsClusters = async (getAccessToken, cancelTokenSource, toolId, awsIamRole, awsIamRoleName) => {
  let postBody = {
    toolId: toolId,
    roleArn: awsIamRole,
    roleSessionName: awsIamRoleName
  };
  const apiUrl = `/tools/aws/v2/eks/clusters/iamrole`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, postBody);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

argoActions.getIAMRoles = async (getAccessToken, cancelTokenSource, awsToolId) => {
  let urlParams = {
    toolId: awsToolId
  };
  const apiUrl = `/tools/aws/v2/IAMRoles`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

argoActions.getArgoRepositories = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/argo/v2/repositories`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

argoActions.createArgoRepositoryV2 = async (getAccessToken, cancelTokenSource, toolId, argoRepositoryModel) => {
  const apiUrl = `/tools/${toolId}/argo/v2/repository/create`;
  const postBody = {
    ...argoRepositoryModel.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.deleteArgoRepositoryV2 = async (getAccessToken, cancelTokenSource, toolId, repoUrl) => {
  const postBody = {
    repoUrl: repoUrl
  };
  const apiUrl = `/tools/${toolId}/argo/v2/repository/delete`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.getArgoProjectDetails = async (getAccessToken, cancelTokenSource, toolId, projectName) => {
  const apiUrl = `/tools/${toolId}/argo/v2/project/${projectName}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

argoActions.createArgoProjectV2 = async (getAccessToken, cancelTokenSource, toolId, argoProjectModel) => {
  const apiUrl = `/tools/${toolId}/argo/v2/project`;
  const postBody = {
    ...argoProjectModel.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.updateArgoProjectV2 = async (getAccessToken, cancelTokenSource, toolId, argoProjectModel) => {
  const apiUrl = `/tools/${toolId}/argo/v2/project`;
  const postBody = {
    ...argoProjectModel.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.deleteArgoProjectV2 = async (getAccessToken, cancelTokenSource, toolId, projectName) => {
  const apiUrl = `/tools/${toolId}/argo/v2/project/${projectName}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default argoActions;
