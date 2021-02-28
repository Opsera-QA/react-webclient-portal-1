import baseActions from "utils/actionsBase";

const dashboardTemplatesActions = {};

dashboardTemplatesActions.getDashboardTemplatesV2 = async(getAccessToken, cancelTokenSource, dashboardCatalogFilterModel) => {
    const apiUrl = "/analytics/dashboard/templates";
    let urlParams = {
      params: {
        source: dashboardCatalogFilterModel.getData("source")
      }
    };

    return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

dashboardTemplatesActions.publishTemplateV2 = async(getAccessToken, cancelTokenSource, dashboardId, catalog) => {
  const apiUrl = "/analytics/dashboard/publish";
  let params = {
      catalog: catalog,
      dashboardId: dashboardId
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, params);
};

dashboardTemplatesActions.addTemplateToDashboards = async(getAccessToken, cancelTokenSource, templateId, catalog) => {
  const apiUrl = "/analytics/dashboard/add";
  let params = {
      catalog: catalog === "private" ? catalog : "public",
      templateId: templateId
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, params);
};

export default dashboardTemplatesActions;