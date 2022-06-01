import baseActions from "utils/actionsBase";

const BlackDuckStepActions = {};

BlackDuckStepActions.getProjects = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `tools/${toolId}/blackduck/projects`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

BlackDuckStepActions.getTags = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `tools/blackduck/tags`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default BlackDuckStepActions;
