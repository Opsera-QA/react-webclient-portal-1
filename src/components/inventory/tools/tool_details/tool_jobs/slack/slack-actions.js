import baseActions from "utils/actionsBase";

const slackConnectorActions = {};

slackConnectorActions.getSlackUrlV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/slack/authorization-url/${toolId}`;

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

slackConnectorActions.getSlackConnectorSettingsV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/connectors/slack/settings`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default slackConnectorActions;