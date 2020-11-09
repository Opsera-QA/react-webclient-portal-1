import { axiosApiService } from "../../../../../../../../api/apiService";

const OctopusStepActions = {};

OctopusStepActions.getSpaces = async (id, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/octopus/spaces/${id}/octopus`;
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

OctopusStepActions.getReleases = async (id,spaceId, projectId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/octopus/releases/${id}/octopus/${spaceId}/${projectId}`;
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

OctopusStepActions.getEnvironments = async (id,spaceId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/octopus/environments/${id}/octopus/${spaceId}`;
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

export default OctopusStepActions;
