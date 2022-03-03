import baseActions from "utils/actionsBase";

// TODO: These routes should be cleaned up and moved
const dataMappingActions = {};

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
