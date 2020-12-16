import baseActions from "../../../utils/actionsBase";

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

siteNotificationActions.getSiteNotifications = async (getAccessToken) => {
  const apiUrl = "landing/message";
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

siteNotificationActions.getSiteNotification = async (siteNotificationId, getAccessToken) => {
  const apiUrl = `landing/message/${siteNotificationId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

siteNotificationActions.createSiteNotification = async (siteNotificationDataDto, getAccessToken) => {
  let postBody = {
    ...siteNotificationDataDto.getPersistData(),
  };
  const apiUrl = "landing/message/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

export default siteNotificationActions;