import { axiosApiService } from "../../../../../../api/apiService";
import baseActions from "utils/actionsBase";

const argoActions = {};

argoActions.deleteArgoApplication = async (toolID, getAccessToken, appID) => {
  const postBody = {
    type: "delete",
  };
  const accessToken = await getAccessToken();
  const apiUrl = `registry/action/argo/${toolID}/create-app/${appID}`;
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

argoActions.updateArgoApplication = async (argoApplicationDto, getAccessToken, appID) => {
  const postBody = {
    data: argoApplicationDto.getPersistData(),
    type: "update",
  };
  const accessToken = await getAccessToken();
  const toolID = argoApplicationDto.data.toolId;
  const apiUrl = `registry/action/argo/${toolID}/create-app/${appID}`;
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

argoActions.createArgoApplication = async (toolDataDto, getAccessToken) => {
  console.log(toolDataDto.data);
  const postBody = {
    data: toolDataDto.getPersistData(),
    type: "create",
  };
  const accessToken = await getAccessToken();
  const toolID = toolDataDto.data.toolId;
  const apiUrl = `registry/action/argo/${toolID}/create-app`;
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

argoActions.getArgoClusters = async (toolID, getAccessToken) => {
  let postBody = {
    params: {
      tool: "argo",
      toolId: toolID,
    },
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/argo/clusters`;
  const response = await axiosApiService(accessToken)
    .get(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};


argoActions.getArgoClustersV2 = async (toolID, getAccessToken, cancelTokenSource) => {
  let postBody = {
    params: {
      tool: "argo",
      toolId: toolID,
    },
  };
  const apiUrl = `/tools/argo/clusters`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.getArgoProjects = async (toolID, getAccessToken) => {
  let postBody = {
    params: {
      tool: "argo",
      toolId: toolID,
    },
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/argo/projects`;
  const response = await axiosApiService(accessToken)
    .get(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

argoActions.getArgoProjectsV2 = async (toolID, getAccessToken, cancelTokenSource) => {
  let postBody = {
    params: {
      tool: "argo",
      toolId: toolID,
    },
  };
  const apiUrl = `/tools/argo/projects`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

argoActions.getArgoApps = async (toolID, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/tools/properties";
  const postBody = {
    tool: "argo",
    metric: "getApplications",
    id: toolID,
  };
  const res = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return res;
};

export default argoActions;
