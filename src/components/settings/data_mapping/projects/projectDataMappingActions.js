import baseActions from "utils/actionsBase";

const projectDataMappingActions = {};

projectDataMappingActions.createProjectMappingV2 = async (getAccessToken, cancelTokenSource, projectMappingModel) => {
  let postData = {
    ...projectMappingModel.getPersistData(),
  };
  const apiUrl = "/mappings/project/v2/create";
  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

projectDataMappingActions.getProjectMappingsV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/mappings/project/v2`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

projectDataMappingActions.getProjectMappingByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/mappings/projects/${id}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

projectDataMappingActions.updateProjectV2 = async (data, getAccessToken, cancelTokenSource) => {
  let postData = {
    ...data.getPersistData(),
  };
  const apiUrl = `/mappings/update/project/${data.getData("_id")}`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

projectDataMappingActions.deleteProjectMappingV2 = async (getAccessToken, cancelTokenSource, projectMappingId) => {
  const apiUrl = `/mappings/project/${projectMappingId}`;
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

export default projectDataMappingActions;
