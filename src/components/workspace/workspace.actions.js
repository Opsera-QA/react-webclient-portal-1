import baseActions from "utils/actionsBase";

export const workspaceActions = {};

workspaceActions.getFreeTrialWorkspaceItems = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `trial/workspace/all`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};