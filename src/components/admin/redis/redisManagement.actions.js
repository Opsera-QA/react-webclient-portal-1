import baseActions from "utils/actionsBase";

const redisManagementActions = {};

redisManagementActions.getRedisKeys = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/monitoring/redis/keys";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

redisManagementActions.getValueForRedisKey = async (getAccessToken, cancelTokenSource, redisKey) => {
  const apiUrl = `/monitoring/redis/key/${redisKey}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

redisManagementActions.getCurrentSessionData = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/monitoring/redis/user/session";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

redisManagementActions.deleteUserSession = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/monitoring/redis/user/session";
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

redisManagementActions.deleteAllUserSessions = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/monitoring/redis/user/sessions";
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

redisManagementActions.clearOutRedisCache = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/monitoring/redis/cache";
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default redisManagementActions;