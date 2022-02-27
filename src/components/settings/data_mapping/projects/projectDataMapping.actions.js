import baseActions from "utils/actionsBase";

export const projectDataMappingActions = {};

projectDataMappingActions.getProjectDataMappingsV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/mappings/project/v2`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

projectDataMappingActions.getProjectDataMappingByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/mappings/project/v2/${id}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

projectDataMappingActions.createProjectDataMappingV2 = async (getAccessToken, cancelTokenSource, projectDataMappingModel) => {
  const apiUrl = "/mappings/project/v2/create";
  const postData = {
    ...projectDataMappingModel?.getPersistData(),
  };

  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

projectDataMappingActions.updateProjectDataMappingV2 = async (getAccessToken, cancelTokenSource, projectDataMappingModel) => {
  const apiUrl = `/mappings/project/v2/${projectDataMappingModel?.getData("_id")}/update`;
  const postData = {
    ...projectDataMappingModel?.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

projectDataMappingActions.deleteProjectDataMappingV2 = async (getAccessToken, cancelTokenSource, projectMappingId) => {
  const apiUrl = `/mappings/project/v2/${projectMappingId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

projectDataMappingActions.getJenkinsJobs = async (data, getAccessToken) => {
  const apiUrl = `/mappings/projects/jobs/jenkins/${data.getData("tool_id")}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

projectDataMappingActions.getSonarProjects = async (data, getAccessToken) => {
  const apiUrl = `/mappings/projects/jobs/sonar/${data.getData("tool_id")}`;
  let response = await baseActions.apiGetCall(getAccessToken, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};
