import baseActions from "utils/actionsBase";

export const customerDashboardTemplateCatalogActions = {};

customerDashboardTemplateCatalogActions.getCustomerCatalogDashboardTemplates = async (
  getAccessToken,
  cancelTokenSource,
  dashboardCatalogFilterModel,
) => {
  const apiUrl = "/analytics/customer/dashboard/templates";
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

customerDashboardTemplateCatalogActions.publishTemplateV2 = async (
  getAccessToken,
  cancelTokenSource,
  dashboardId,
  roles,
) => {
  const apiUrl = `/analytics/customer/dashboard/templates/publish/${dashboardId}`;
  const postBody = {};

  if (Array.isArray(roles)) {
    postBody.roles = roles;
  }

  return await baseActions.apiPutCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

customerDashboardTemplateCatalogActions.deployCustomerTemplate = async (
  getAccessToken,
  cancelTokenSource,
  templateId,
) => {
  const apiUrl = `/analytics/dashboards/deploy/customer/${templateId}`;
  return await baseActions.apiPutCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

customerDashboardTemplateCatalogActions.deleteTemplate = async (
  getAccessToken,
  cancelTokenSource,
  templateId,
) => {
  const apiUrl = `/analytics/customer/dashboard/templates/${templateId}`;
  return await baseActions.apiDeleteCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};