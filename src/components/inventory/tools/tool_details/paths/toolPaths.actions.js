import baseActions from "utils/actionsBase";

const toolPathsActions = {};

toolPathsActions.getToolPathsV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/paths`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default toolPathsActions;
