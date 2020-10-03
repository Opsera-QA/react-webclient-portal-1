import { axiosApiService } from "api/apiService";

const RegisteredUserActions = {};

RegisteredUserActions.getAnalyticsProfile = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/analytics/profile/user/${userId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

RegisteredUserActions.getUserRecord = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/record/${userId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

RegisteredUserActions.getRegisteredUsers = async (currentPage, pageSize, getAccessToken) => {
  const postBody = {
    page: currentPage,
    size: pageSize,
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/users/get-users`;
  const response = await axiosApiService(accessToken).get(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

RegisteredUserActions.deactivateUser = async (userId, getAccessToken) => {
  const postBody = {
    userId: userId,
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/users/deactivate-user`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
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
  const accessToken = await getAccessToken();
  const apiUrl = `/analytics/profile/${recordId}/update/`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

RegisteredUserActions.deployElkStack = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/tools/activate-elk/${userId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

RegisteredUserActions.getRegisteredUserTools = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/user/${userId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

RegisteredUserActions.getRegisteredUserDb = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/user/${userId}?name=mongodb`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

export default RegisteredUserActions;