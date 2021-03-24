import baseActions from "utils/actionsBase";

const notificationsActions = {};

notificationsActions.deleteNotification = async (dataObject, getAccessToken) => {
  const apiUrl = `/notifications/${dataObject.getData("_id")}`;
  return await baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

notificationsActions.updateNotification = async (notificationDataDto, getAccessToken) => {
  const postBody = {
    ...notificationDataDto.getPersistData()
  };
  const apiUrl = `/notifications/${notificationDataDto.getData("_id")}/update`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

notificationsActions.updateNotificationV2 = async (getAccessToken, cancelTokenSource,notificationDataDto) => {
  const postBody = {
    ...notificationDataDto.getPersistData()
  };
  const apiUrl = `/notifications/${notificationDataDto.getData("_id")}/update`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

notificationsActions.createNotification = async (notificationDataDto, getAccessToken) => {
  const postBody = {
    ...notificationDataDto.getPersistData()
  };
  const apiUrl = "/notifications/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

notificationsActions.createNotificationV2 = async (getAccessToken, cancelTokenSource, notificationDataDto) => {
  const postBody = {
    ...notificationDataDto.getPersistData()
  };
  const apiUrl = "/notifications/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

notificationsActions.getNotificationsList = async (notificationDataDto, getAccessToken) => {
  let sortOption = notificationDataDto.getData("sortOption");

  let urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      page: notificationDataDto.getData("currentPage"),
      size: notificationDataDto.getData("pageSize"),
      tag: notificationDataDto.getFilterValue("tag"),
      type: notificationDataDto.getFilterValue("type"),
      status: notificationDataDto.getFilterValue("status"),
      tool: notificationDataDto.getFilterValue("toolIdentifier"),
      search: notificationDataDto.getFilterValue("search")
    }
  };

  const apiUrl = `/notifications`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

notificationsActions.getNotificationById = async (id, getAccessToken) => {
  const apiUrl = `/notifications/${id}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

notificationsActions.getNotificationByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/notifications/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

notificationsActions.getNotificationActivityLogs = async (notificationDataDto, notificationActivityFilterDto, getAccessToken) => {
  let sortOption = notificationActivityFilterDto.getData("sortOption");
  let urlParams = {
    params: {
      sort: notificationActivityFilterDto ? sortOption.value : undefined,
      page: notificationActivityFilterDto.getData("currentPage"),
      size: notificationActivityFilterDto.getData("pageSize"),
      tag: notificationActivityFilterDto.getFilterValue("tag"),
      type: notificationActivityFilterDto.getFilterValue("type"),
      status: notificationActivityFilterDto.getFilterValue("status"),
      search: notificationActivityFilterDto.getFilterValue("search"),
    }
  };

  const apiUrl = `/notifications/logs/${notificationDataDto.getData("_id")}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

notificationsActions.getAllNotificationActivityLogs = async ( notificationActivityFilterDto, getAccessToken) => {
  let sortOption = notificationActivityFilterDto.getData("sortOption");
  let urlParams = {
    params: {
      sort: notificationActivityFilterDto ? sortOption.value : undefined,
      page: notificationActivityFilterDto.getData("currentPage"),
      size: notificationActivityFilterDto.getData("pageSize"),
      tag: notificationActivityFilterDto.getFilterValue("tag"),
      type: notificationActivityFilterDto.getFilterValue("type"),
      status: notificationActivityFilterDto.getFilterValue("status"),
      search: notificationActivityFilterDto.getFilterValue("search"),
    }
  };

  const apiUrl = `/notifications/logs/`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

export default notificationsActions;