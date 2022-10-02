import baseActions from "utils/actionsBase";

export const freeTrialUserExpirationActions = {};

freeTrialUserExpirationActions.getExtendableUserList = async (
  getAccessToken,
  cancelTokenSource,
) => {
  const apiUrl = `/trial/users/extendable`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

freeTrialUserExpirationActions.extendUserAccessById = async (
  getAccessToken,
  cancelTokenSource,
  userId,
) => {
  const apiUrl = `/trial/users/${userId}/extend-access`;
  return await baseActions.apiPatchCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

freeTrialUserExpirationActions.revokeUserAccessById = async (
  getAccessToken,
  cancelTokenSource,
  userId,
) => {
  const apiUrl = `/trial/users/${userId}/revoke-access`;
  return await baseActions.apiPatchCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};
