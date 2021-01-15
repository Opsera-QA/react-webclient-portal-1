import baseActions from "utils/actionsBase";

const RegisteredUserActions = {};

RegisteredUserActions.getAnalyticsProfile = async (userId, getAccessToken) => {
  const apiUrl = `/analytics/profile/user/${userId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

RegisteredUserActions.getUserRecord = async (userId, getAccessToken) => {
  const apiUrl = `/users/record/${userId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

RegisteredUserActions.getRegisteredUsers = async (filterDto, getAccessToken) => {
  let sortOption = filterDto.getData("sortOption");

  const urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      size: filterDto.getData("pageSize"),
      page: filterDto.getData("currentPage"),
      search: filterDto.getData("search")
    },
  };

  const apiUrl = `/users/get-users`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

RegisteredUserActions.deactivateUser = async (userId, getAccessToken) => {
  const postBody = {
    userId: userId,
  };
  const apiUrl = `/users/deactivate-user`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

RegisteredUserActions.updateAnalyticsProfile = async (analyticsProfileDto, getAccessToken) => {
  let persistData = analyticsProfileDto.getPersistData();
  let recordId = analyticsProfileDto.getData("_id");
  let postBody = {
    workflowType: {
      "Infrastructure": persistData.Infrastructure,
      "Pipeline": persistData.Pipeline,
    },
    enabledTools: persistData.enabledTools,
    defaultPersona: persistData.defaultPersona,
    analyticsServerUrl: persistData.analyticsServerUrl,
    hitsIndex: persistData.hitsIndex,
    dataUsage: persistData.dataUsage,
    active: persistData.active,
    allowData: persistData.allowData,
  };
  const apiUrl = `/analytics/profile/${recordId}/update/`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

RegisteredUserActions.deployElkStack = async (userId, getAccessToken) => {
  const apiUrl = `/users/tools/activate-elk/${userId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

RegisteredUserActions.getRegisteredUserTools = async (userId, getAccessToken) => {
  const apiUrl = `/tools/user/${userId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

RegisteredUserActions.getRegisteredUserDb = async (userId, getAccessToken) => {
  const apiUrl = `/tools/user/${userId}?name=mongodb`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

RegisteredUserActions.syncLdap = async (userId, getAccessToken) => {
  const apiUrl = `/users/record/${userId}/sync`;
  return await baseActions.apiPutCall(getAccessToken, apiUrl);
};

export default RegisteredUserActions;