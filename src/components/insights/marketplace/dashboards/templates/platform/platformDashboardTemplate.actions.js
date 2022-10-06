import baseActions from "utils/actionsBase";

export const platformDashboardTemplateActions = {};

platformDashboardTemplateActions.getPlatformDashboardTemplatesV2 = async (
  getAccessToken,
  cancelTokenSource,
  dashboardCatalogFilterModel,
) => {
  const apiUrl = "/analytics/platform/dashboard/templates";
  const urlParams = {
    params: {
      sort: dashboardCatalogFilterModel?.getFilterValue("sortOption"),
      page: dashboardCatalogFilterModel?.getFilterValue("currentPage"),
      size: dashboardCatalogFilterModel?.getFilterValue("pageSize"),
      search: dashboardCatalogFilterModel?.getFilterValue("search"),
      type: dashboardCatalogFilterModel?.getFilterValue("type"),
    },
  };

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    urlParams,
  );
};

platformDashboardTemplateActions.publishTemplateV2 = async (
  getAccessToken,
  cancelTokenSource,
  dashboardId,
) => {
  const apiUrl = `/analytics/platform/dashboard/templates/publish/${dashboardId}`;
  return await baseActions.apiPutCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

platformDashboardTemplateActions.deployPlatformTemplate = async (
  getAccessToken,
  cancelTokenSource,
  templateId,
) => {
  const apiUrl = `/analytics/dashboards/deploy/platform/${templateId}`;
  return await baseActions.apiPutCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

platformDashboardTemplateActions.deleteTemplate = async (
  getAccessToken,
  cancelTokenSource,
  templateId,
) => {
  const apiUrl = `/analytics/platform/dashboard/templates/${templateId}`;
  return await baseActions.apiDeleteCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};