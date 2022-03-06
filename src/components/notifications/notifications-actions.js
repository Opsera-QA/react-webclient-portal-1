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

notificationsActions.getNotificationsListV2 = async (getAccessToken, cancelTokenSource, notificationFilterModel) => {
  let sortOption = notificationFilterModel?.getData("sortOption");

  let urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      page: notificationFilterModel?.getData("currentPage"),
      size: notificationFilterModel?.getData("pageSize"),
      tag: notificationFilterModel?.getFilterValue("tag"),
      type: notificationFilterModel?.getFilterValue("type"),
      status: notificationFilterModel?.getFilterValue("status"),
      tool: notificationFilterModel?.getFilterValue("toolIdentifier"),
      search: notificationFilterModel?.getFilterValue("search")
    }
  };

  const apiUrl = `/notifications`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource,  apiUrl, urlParams);
};

notificationsActions.getNotificationById = async (id, getAccessToken) => {
  const apiUrl = `/notifications/${id}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

notificationsActions.getNotificationByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/notifications/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

notificationsActions.getNotificationActivityLogsV2 = async (getAccessToken, cancelTokenSource, notificationId, notificationActivityFilterDto) => {
  const apiUrl = `/notifications/logs/${notificationId}`;
  const sortOption = notificationActivityFilterDto?.getData("sortOption");
  let urlParams = {
    params: {
      sort: notificationActivityFilterDto ? sortOption.value : undefined,
      page: notificationActivityFilterDto?.getData("currentPage"),
      size: notificationActivityFilterDto?.getData("pageSize"),
      tag: notificationActivityFilterDto?.getFilterValue("tag"),
      type: notificationActivityFilterDto?.getFilterValue("type"),
      status: notificationActivityFilterDto?.getFilterValue("status"),
      search: notificationActivityFilterDto?.getFilterValue("search"),
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};


notificationsActions.getAllNotificationActivityLogsV2 = async (getAccessToken, cancelTokenSource, notificationActivityFilterDto) => {
  const apiUrl = `/notifications/logs/`;
  const sortOption = notificationActivityFilterDto.getData("sortOption");
  const urlParams = {
    params: {
      sort: notificationActivityFilterDto ? sortOption?.value : undefined,
      page: notificationActivityFilterDto.getData("currentPage"),
      size: notificationActivityFilterDto.getData("pageSize"),
      tag: notificationActivityFilterDto.getFilterValue("tag"),
      type: notificationActivityFilterDto.getFilterValue("type"),
      status: notificationActivityFilterDto.getFilterValue("status"),
      search: notificationActivityFilterDto.getFilterValue("search"),
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

export default notificationsActions;