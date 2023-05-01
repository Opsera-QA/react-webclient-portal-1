import useApiService from "hooks/api/service/useApiService";

export default function useDashboardActions() {
  const apiService = useApiService();
  const dashboardActions = {};

  dashboardActions.getDashboards = async(dashboardFilterModel) => {
    const apiUrl = "/analytics/dashboards";
    const queryParameters = {
      sort: dashboardFilterModel?.getFilterValue("sortOption"),
      page: dashboardFilterModel?.getFilterValue("currentPage"),
      size: dashboardFilterModel?.getFilterValue("pageSize"),
      tag: dashboardFilterModel?.getFilterValue("tag"),
      status: dashboardFilterModel?.getFilterValue("status"),
      tool: dashboardFilterModel?.getFilterValue("toolIdentifier"),
      owner: dashboardFilterModel?.getFilterValue("owner"),
      search: dashboardFilterModel?.getFilterValue("search"),
      kpiIdentifier: dashboardFilterModel?.getFilterValue("identifier"),
      type: dashboardFilterModel?.getFilterValue("type")
    };

    return await apiService.handleApiGetRequest(apiUrl, queryParameters);
  };

  return dashboardActions;
}
