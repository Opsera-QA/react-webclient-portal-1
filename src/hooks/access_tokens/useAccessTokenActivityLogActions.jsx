import useApiService from "hooks/api/service/useApiService";

export default function useAccessTokenActivityLogActions() {
  const apiService = useApiService();
  const accessTokenActivityLogActions = {};

  accessTokenActivityLogActions.getUserAccessTokenActivityLogs = async (
    userId,
    filterModel,
  ) => {
    const apiUrl = `/account/access-tokens/${userId}`;
    const queryParameters = {
      search: filterModel?.getFilterValue("search"),
      scope: filterModel?.getFilterValue("scope"),
      sortOption: filterModel?.getFilterValue("sortOption"),
      currentPage: filterModel?.getFilterValue("currentPage"),
      pageSize: filterModel?.getFilterValue("pageSize"),
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  return accessTokenActivityLogActions;
}
