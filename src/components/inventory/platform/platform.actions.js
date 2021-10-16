import baseActions from "utils/actionsBase";

const platformActions = {};

platformActions.getApplicationsV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/applications`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default platformActions;