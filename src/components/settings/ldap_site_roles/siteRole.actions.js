import baseActions from "utils/actionsBase";

export const siteRoleActions = {};

siteRoleActions.activateSiteRole = async (
  getAccessToken,
  cancelTokenSource,
  siteRoleName,
) => {
  const apiUrl = `/account/site-roles/${siteRoleName}`;
  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};