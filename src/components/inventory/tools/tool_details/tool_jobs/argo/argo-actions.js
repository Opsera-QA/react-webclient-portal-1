import baseActions from "utils/actionsBase";

const argoActions = {};

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
  const apiUrl = `/tools/argo/clusters`;
  let postBody = {
    params: {
      tool: "argo",
      toolId: toolId,
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.getArgoProjectsV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/argo/projects`;
  let postBody = {
    params: {
      tool: "argo",
      toolId: toolId,
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.getArgoApplicationsV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/argo/v2/applications`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default argoActions;
