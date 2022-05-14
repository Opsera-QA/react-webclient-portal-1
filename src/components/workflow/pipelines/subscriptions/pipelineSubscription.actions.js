import baseActions from "utils/actionsBase";

export const pipelineSubscriptionActions = {};

pipelineSubscriptionActions.subscribeToPipeline = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `subscriptions/pipelines/${pipelineId}/subscribe`;
  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineSubscriptionActions.unsubscribeFromPipeline = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `subscriptions/pipelines/${pipelineId}/unsubscribe`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineSubscriptionActions.isSubscribed = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/subscriptions/pipelines/${pipelineId}/is_subscribed`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineSubscriptionActions.getSubscribedPipelines = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/subscriptions/pipelines`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineSubscriptionActions.getSubscribedPipelineIds = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/subscriptions/pipelines/ids`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};
