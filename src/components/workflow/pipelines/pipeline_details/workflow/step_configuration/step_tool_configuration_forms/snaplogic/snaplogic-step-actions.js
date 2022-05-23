import baseActions from "utils/actionsBase";

const snaplogicStepActions = {};

snaplogicStepActions.getProjectSpaces = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `tools/${toolId}/snaplogic/projectSpaces`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

snaplogicStepActions.getProjects = async (getAccessToken, cancelTokenSource, toolId, projectSpace) => {
  const apiUrl = `tools/${toolId}/snaplogic/${projectSpace}/projects`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default snaplogicStepActions;
