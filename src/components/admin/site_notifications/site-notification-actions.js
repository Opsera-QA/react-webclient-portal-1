import baseActions from "utils/actionsBase";

const siteNotificationActions = {};

siteNotificationActions.deleteSiteNotification = async (siteNotificationDataDto, getAccessToken) => {
  const apiUrl = `landing/message/${siteNotificationDataDto.getData("_id")}/delete`;
  return await baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

siteNotificationActions.updateSiteNotification = async (siteNotificationDataDto, getAccessToken) => {
  let postBody = {
    ...siteNotificationDataDto.getPersistData(),
  };
  const apiUrl = `landing/message/${siteNotificationDataDto.getData("_id")}/update/`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

siteNotificationActions.updateSiteNotificationV2 = async (siteNotificationDataDto, getAccessToken, cancelTokenSource ) => {
  let postBody = {
    ...siteNotificationDataDto.getPersistData(),
  };
  const apiUrl = `landing/message/${siteNotificationDataDto.getData("_id")}/update/`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

siteNotificationActions.getSiteNotifications = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "landing/message";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

siteNotificationActions.getSiteNotification = async (siteNotificationId, getAccessToken) => {
  const apiUrl = `landing/message/${siteNotificationId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

siteNotificationActions.getSiteNotificationV2 = async (siteNotificationId, getAccessToken, cancelTokenSource) => {
  const apiUrl = `landing/message/${siteNotificationId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

siteNotificationActions.createSiteNotification = async (siteNotificationDataDto, getAccessToken) => {
  let postBody = {
    ...siteNotificationDataDto.getPersistData(),
  };
  const apiUrl = "landing/message/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

siteNotificationActions.createSiteNotificationV2 = async (siteNotificationDataDto, getAccessToken, cancelTokenSource ) =>{
  let postBody = {
    ...siteNotificationDataDto.getPersistData(),
  };
  const apiUrl = "landing/message/create";
  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};


export default siteNotificationActions;