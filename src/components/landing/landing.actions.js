import baseActions from "utils/actionsBase";

const landingActions = {};

landingActions.getLandingStats = async(getAccessToken, cancelTokenSource) => {
  const apiUrl = `/landing/stats`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};


export default landingActions;