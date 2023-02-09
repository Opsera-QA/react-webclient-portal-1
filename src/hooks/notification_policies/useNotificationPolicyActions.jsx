import useApiService from "hooks/api/service/useApiService";

export default function useNotificationPolicyActions() {
  const apiService = useApiService();
  const notificationPolicyActions = {};

  notificationPolicyActions.getNotificationPolicyById = async (
    notificationId,
  ) => {
    const apiUrl = `/notifications/${notificationId}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  notificationPolicyActions.createNotificationPolicy = async (notificationModel) => {
    const postBody = notificationModel.getPersistData();
    const apiUrl = "/notifications/create";
    return await apiService.handleApiPostRequest(apiUrl, postBody);
  };

  notificationPolicyActions.updateNotificationPolicy = async (notificationModel) => {
    const postBody = notificationModel.getPersistData();
    const apiUrl = `/notifications/${notificationModel.getData("_id")}/update`;
    return await apiService.handleApiPutRequest(apiUrl, postBody);
  };

  notificationPolicyActions.deleteNotificationPolicy = async (notificationId) => {
    const apiUrl = `/notifications/${notificationId}`;
    return await apiService.handleApiDeleteRequest(apiUrl);
  };

  notificationPolicyActions.getNotificationsPolicies = async (notificationFilterModel) => {
    const apiUrl = `/notifications`;
    const queryParameters = {
      sort: notificationFilterModel?.getFilterValue("sortOption"),
      page: notificationFilterModel?.getFilterValue("currentPage"),
      size: notificationFilterModel?.getFilterValue("pageSize"),
      tag: notificationFilterModel?.getFilterValue("tag"),
      type: notificationFilterModel?.getFilterValue("type"),
      status: notificationFilterModel?.getFilterValue("status"),
      search: notificationFilterModel?.getFilterValue("search"),
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  notificationPolicyActions.getNotificationActivityLogs = async (notificationId, notificationActivityFilterDto) => {
    const apiUrl = `/notifications/logs/${notificationId}`;
    const queryParameters = {
      sort: notificationActivityFilterDto?.getFilterValue("sortOption"),
      page: notificationActivityFilterDto?.getFilterValue("currentPage"),
      size: notificationActivityFilterDto?.getFilterValue("pageSize"),
      tag: notificationActivityFilterDto?.getFilterValue("tag"),
      type: notificationActivityFilterDto?.getFilterValue("type"),
      status: notificationActivityFilterDto?.getFilterValue("status"),
      search: notificationActivityFilterDto?.getFilterValue("search"),
    };

    return await apiService.handleApiGetRequest(apiUrl, queryParameters);
  };


  notificationPolicyActions.getAllNotificationActivityLogs = async (notificationActivityFilterDto) => {
    const apiUrl = `/notifications/logs/`;
    const sortOption = notificationActivityFilterDto.getData("sortOption");
    const queryParameters = {
      sort: notificationActivityFilterDto ? sortOption?.value : undefined,
      page: notificationActivityFilterDto.getData("currentPage"),
      size: notificationActivityFilterDto.getData("pageSize"),
      tag: notificationActivityFilterDto.getFilterValue("tag"),
      type: notificationActivityFilterDto.getFilterValue("type"),
      status: notificationActivityFilterDto.getFilterValue("status"),
      search: notificationActivityFilterDto.getFilterValue("search"),
    };

    return await apiService.handleApiGetRequest(apiUrl, queryParameters);
  };

  return notificationPolicyActions;
}
