import baseActions from "../../../utils/actionsBase";

const siteNotificationActions = {};

siteNotificationActions.deleteSiteNotification = async (bannerId, getAccessToken) => {
  const apiUrl = `/banners/${bannerId}`;
  return await baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

siteNotificationActions.updateSiteNotification = async (bannerDataDto, getAccessToken) => {
  let postBody = {
    ...bannerDataDto.getPersistData(),
  };
  const apiUrl = `/site-notifications/${bannerDataDto.getData("_id")}/update/`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

siteNotificationActions.getSiteNotifications = async (getAccessToken) => {
  const apiUrl = "/site-notifications";
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

siteNotificationActions.getSiteNotification = async (bannerId, getAccessToken) => {
  const apiUrl = `/site-notifications/${bannerId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

siteNotificationActions.createSiteNotification = async (bannerDataDto, getAccessToken) => {
  let postBody = {
    ...bannerDataDto.getPersistData(),
  };
  const apiUrl = "/site-notifications/create";
  return await baseActions.apiGetCall(getAccessToken, apiUrl, postBody);
};

export default siteNotificationActions;