import baseActions from "utils/actionsBase";

export const dashboardSubscriptionActions = {};

dashboardSubscriptionActions.subscribeToDashboard = async (getAccessToken, cancelTokenSource, dashboardId) => {
  const apiUrl = `/subscriptions/dashboards/${dashboardId}/subscribe`;
  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

dashboardSubscriptionActions.unsubscribeFromDashboard = async (getAccessToken, cancelTokenSource, dashboardId) => {
  const apiUrl = `/subscriptions/dashboards/${dashboardId}/unsubscribe`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

dashboardSubscriptionActions.isSubscribed = async (getAccessToken, cancelTokenSource, dashboardId) => {
  const apiUrl = `/subscriptions/dashboards/${dashboardId}/is_subscribed`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

dashboardSubscriptionActions.getSubscribedDashboards = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/subscriptions/dashboards`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

dashboardSubscriptionActions.getSubscribedDashboardIds = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/subscriptions/dashboards/ids`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};
