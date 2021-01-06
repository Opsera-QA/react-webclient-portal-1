import baseActions from "utils/actionsBase";

const notificationsActions = {};

notificationsActions.deleteNotification = async (dataObject, getAccessToken) => {
  const apiUrl = `/notifications/${dataObject.getData("_id")}`;
  return await baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

notificationsActions.updateNotification = async (notificationDataDto, getAccessToken) => {
  const postBody = {
    ...notificationDataDto.getPersistData()
  }
  const apiUrl = `/notifications/${notificationDataDto.getData("_id")}/update`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

notificationsActions.createNotification = async (notificationDataDto, getAccessToken) => {
  const postBody = {
    ...notificationDataDto.getPersistData()
  }
  const apiUrl = "/notifications/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

notificationsActions.getNotificationsList = async (toolFilterDto, getAccessToken) => {
  let sortOption = toolFilterDto.getData("sortOption");

  let urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      page: toolFilterDto.getData("currentPage"),
      size: toolFilterDto.getData("pageSize"),
      tag: toolFilterDto.getFilterValue("tag"),
      type: toolFilterDto.getFilterValue("type"),
      status: toolFilterDto.getFilterValue("status"),
      tool: toolFilterDto.getFilterValue("toolIdentifier"),
      search: toolFilterDto.getFilterValue("search")
    }
  }

  const apiUrl = `/notifications`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

notificationsActions.getNotificationById = async (id, getAccessToken) => {
  const apiUrl = `/notifications/${id}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

export default notificationsActions;