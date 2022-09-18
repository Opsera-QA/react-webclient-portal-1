import baseActions from "utils/actionsBase";

export const vaultHelper = {};

vaultHelper.getFromVault = async (getAccessToken, cancelTokenSource, key) => {
  const apiUrl = `/vault/${key}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};