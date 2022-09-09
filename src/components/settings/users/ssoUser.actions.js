import baseActions from "utils/actionsBase";

export const ssoUserActions = {};

ssoUserActions.getPlatformUsers = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/users/platform`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};
