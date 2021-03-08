import baseActions from "utils/actionsBase";

const dashboardTemplatesActions = {};

dashboardTemplatesActions.getDashboardTemplatesV2 = async(getAccessToken, cancelTokenSource, dashboardCatalogFilterModel) => {
  const apiUrl = "/analytics/dashboard/templates";
  let sortOption = dashboardCatalogFilterModel?.getData("sortOption");

  let urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      page: dashboardCatalogFilterModel.getData("currentPage"),
      size: dashboardCatalogFilterModel.getData("pageSize"),
      source: dashboardCatalogFilterModel.getFilterValue("source"),
      search: dashboardCatalogFilterModel.getFilterValue("search"),
      type: dashboardCatalogFilterModel.getFilterValue("type")
    }
  }

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

dashboardTemplatesActions.publishTemplateV2 = async(getAccessToken, cancelTokenSource, dashboardId, catalog) => {
  const apiUrl = "/analytics/dashboard/templates/publish";
  const params = {
      catalog: catalog,
      dashboardId: dashboardId
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, params);
};

dashboardTemplatesActions.addTemplateToDashboards = async(getAccessToken, cancelTokenSource, templateId, catalog) => {
  const apiUrl = "/analytics/dashboard/templates/add";
  const params = {
      catalog: catalog === "private" ? catalog : "public",
      templateId: templateId
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, params);
};

dashboardTemplatesActions.deleteTemplate = async(getAccessToken, cancelTokenSource, templateId, catalog) => {
  const apiUrl = `/analytics/dashboard/templates/${catalog}/${templateId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default dashboardTemplatesActions;