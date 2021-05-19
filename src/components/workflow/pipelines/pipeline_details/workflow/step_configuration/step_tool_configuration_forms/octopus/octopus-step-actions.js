import { axiosApiService } from "../../../../../../../../api/apiService";
import baseActions from "../../../../../../../../utils/actionsBase";
import octopusActions from "../../../../../../../inventory/tools/tool_details/tool_jobs/octopus/octopus-actions";
import nexusStepActions from "../nexus/nexus-step-actions";

const OctopusStepActions = {};

OctopusStepActions.getSpaces = async (id, getAccessToken) => {
  const apiUrl = `/tools/octopus/spaces/${id}/octopus`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getProjects = async (id,spaceId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/octopus/projects/${id}/octopus/${spaceId}`;
  const res = await axiosApiService(accessToken)
    .get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return res;
};

OctopusStepActions.getVersions = async (id,spaceId, feedId,ecrPushStepId,pipelineId, getAccessToken) => {
  const apiUrl = `/tools/octopus/versions/${id}/octopus/${spaceId}/${feedId}/${ecrPushStepId}/${pipelineId}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getEnvironments = async (id,spaceId, getAccessToken) => {
  const apiUrl = `/tools/octopus/environments/${id}/octopus/${spaceId}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getTenants = async (id,spaceId, projectId,environmentId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/octopus/tenants/${id}/octopus/${spaceId}/${projectId}/${environmentId}`;
  const res = await axiosApiService(accessToken)
    .get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return res;
};

OctopusStepActions.getAccounts = async (id,spaceId, getAccessToken) => {
  const apiUrl = `/tools/octopus/accounts/${id}/octopus/${spaceId}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getClusters = async (id,awsToolConfigId, getAccessToken) => {
  const apiUrl = `/tools/octopus/clusters/${id}/octopus/${awsToolConfigId}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getCloudOptions = async (id, spaceId, getAccessToken) => {
  const apiUrl = `/tools/octopus/accounts/type/${id}/octopus/${spaceId}}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getCommunicationStyles = async (id, spaceId, getAccessToken) => {
  const apiUrl = `/tools/octopus/target/commStyle/${id}/octopus/${spaceId}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getWebAppNames = async (id, spaceId,accountId, getAccessToken) => {
  const apiUrl = `/tools/octopus/target/resourceWebName/${id}/octopus/${spaceId}/${accountId}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getFeedTypes = async (id, spaceId, getAccessToken) => {
  const apiUrl = `/tools/octopus/feeds/types/${id}/octopus/${spaceId}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getFeedList = async (id, spaceId, getAccessToken) => {
  const apiUrl = `/tools/octopus/feeds/list/${id}/octopus/${spaceId}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getPlatformTypes = async (id, spaceId, getAccessToken) => {
  const apiUrl = `/tools/octopus/platform/types/${id}/octopus/${spaceId}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getDeploymentTypes = async (id, spaceId,platformType, getAccessToken) => {
  const apiUrl = `/tools/octopus/deployment/types/${id}/octopus/${spaceId}/${platformType}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getTargetRoles = async (id, spaceId, getAccessToken) => {
  const apiUrl = `/tools/octopus/target/roles/${id}/octopus/${spaceId}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.validateItems = async (id, spaceId,type,dataObject, getAccessToken) => {
  const apiUrl = `/tools/octopus/validate/${id}/${type}/${spaceId}/${dataObject.getData("id")}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.validateProjectName = async (id, spaceId,projectName,dataObject, getAccessToken) => {
  const apiUrl = `/tools/octopus/validate/project/${id}/${projectName}/${spaceId}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getNexusRepos = async (toolID, getAccessToken) => {
  let postBody = {
    params: {
      tool: "nexus",
      toolId: toolID,
    }
  };
  const apiUrl = `/tools/nexus/repositories`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl, postBody);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

OctopusStepActions.getLifecycles = async (id, spaceId, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/tools/octopus/lifecycle/${id}/${spaceId}`;
  let response = await baseActions.apiGetCallV2(getAccessToken,cancelTokenSource, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

export default OctopusStepActions;
