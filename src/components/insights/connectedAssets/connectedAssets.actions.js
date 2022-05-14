import baseActions from "utils/actionsBase";

const connectedAssetsActions = {};

connectedAssetsActions.getConnectedAssetsData = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
) => {
  const apiUrl = "/analytics/metrics";

  const postBody = {
    request: request,
    startDate: startDate,
    endDate: endDate
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default connectedAssetsActions;
