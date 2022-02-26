import baseActions from "utils/actionsBase";

const dataMappingActions = {};

dataMappingActions.createUserMapping = async (data, getAccessToken) => {
  let postData = {
    ...data.getPersistData(),
  };
  const apiUrl = "/mappings/create/users";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

dataMappingActions.createUserMappingV2 = async (data, getAccessToken, cancelTokenSource) => {
  let postData = {
    ...data.getPersistData(),
  };
  const apiUrl = "/mappings/create/users";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

dataMappingActions.getUserMappings = async (getAccessToken) => {
  const apiUrl = `/mappings/users`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

dataMappingActions.getUserMappingsV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/mappings/users`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

dataMappingActions.getUserMappingById = async (id, getAccessToken) => {
  const apiUrl = `/mappings/users/${id}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

dataMappingActions.updateUserMapping = async (data, getAccessToken) => {
  let postData = {
    ...data.getPersistData(),
  };
  const apiUrl = `/mappings/update/users/${data.getData("_id")}`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

dataMappingActions.updateUserMappingV2 = async (data, getAccessToken, cancelTokenSource) => {
  let postData = {
    ...data.getPersistData(),
  };
  const apiUrl = `/mappings/update/users/${data.getData("_id")}`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

dataMappingActions.deleteUserMapping = async (data, getAccessToken) => {
  const apiUrl = `/mappings/users/${data.getData("_id")}`;
  return await baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

dataMappingActions.getSCMUserList = async (data, getAccessToken) => {
  const apiUrl = `/mappings/users/scmlist/${data.getData("tool_identifier")}/${data.getData("tool_id")}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

dataMappingActions.getJenkinsJobs = async (data, getAccessToken) => {
  const apiUrl = `/mappings/projects/jobs/jenkins/${data.getData("tool_id")}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

dataMappingActions.getSonarProjects = async (data, getAccessToken) => {
  const apiUrl = `/mappings/projects/jobs/sonar/${data.getData("tool_id")}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

export default dataMappingActions;
