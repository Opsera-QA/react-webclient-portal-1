import baseActions from "utils/actionsBase";

export const groupActions = {};

groupActions.getResourcesWithGroupAssigned = async (
  getAccessToken,
  cancelTokenSource,
  group,
  type,
) => {
  const apiUrl = `/users/account/group/assigned-roles/resources/`;
  const queryParameters = {
    group: group,
    type: type,
  };

  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    queryParameters,
  );
};