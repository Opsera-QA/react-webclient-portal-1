import baseActions from "utils/actionsBase";

export const workspaceActions = {};

workspaceActions.getWorkspaceItems = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/workspace/all`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};