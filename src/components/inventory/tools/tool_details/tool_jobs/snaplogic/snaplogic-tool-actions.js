import baseActions from "utils/actionsBase";

const snaplogicToolActions = {};

snaplogicToolActions.getSnaplogicProjects = async (getAccessToken, cancelTokenSource, toolID) => {
  const apiUrl = `/tools/${toolID}/snaplogic/projects`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

snaplogicToolActions.getSnaplogicUserGroups = async (getAccessToken, cancelTokenSource, toolID) => {
  const apiUrl = `/tools/${toolID}/snaplogic/usergroups`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

snaplogicToolActions.createProject = async (getAccessToken, cancelTokenSource, toolID, pmdRuleModel) => {
  const postBody = pmdRuleModel.getPersistData();
  const apiUrl = `/tools/${toolID}/snaplogic/createproject`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

snaplogicToolActions.updateProject = async (getAccessToken, cancelTokenSource, toolID, projectId, pmdRuleModel) => {
  const postBody = pmdRuleModel.getPersistData();
  const apiUrl = `/tools/${toolID}/snaplogic/${projectId}/updateproject`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

snaplogicToolActions.deleteProject = async (getAccessToken, cancelTokenSource, toolID, projectId) => {
  const apiUrl = `/tools/${toolID}/snaplogic/${projectId}/`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default snaplogicToolActions;
