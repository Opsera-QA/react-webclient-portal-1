import baseActions from "utils/actionsBase";

export const ssoUserActions = {};

ssoUserActions.getPlatformUsers = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/users/platform`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

ssoUserActions.getUserById = async (
  getAccessToken,
  cancelTokenSource,
  id,
) => {
  const apiUrl = `/users/user/${id}`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

ssoUserActions.getRevokedUsers = async (
  getAccessToken,
  cancelTokenSource,
) => {
  const apiUrl = `/users/revoked`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

ssoUserActions.getActiveUsers = async (
  getAccessToken,
  cancelTokenSource,
) => {
  const apiUrl = `/users/active`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

ssoUserActions.revokeUserById = async (
  getAccessToken,
  cancelTokenSource,
  userId,
) => {
  const apiUrl = `/users/${userId}/access/revoke`;
  return await baseActions.apiPatchCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

ssoUserActions.reinstateUserById = async (
  getAccessToken,
  cancelTokenSource,
  userId,
) => {
  const apiUrl = `/users/${userId}/access/reinstate`;
  return await baseActions.apiPatchCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};