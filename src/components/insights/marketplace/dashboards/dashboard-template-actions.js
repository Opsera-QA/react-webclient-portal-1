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
  let urlParams = {
    params: {
      catalog: catalog,
      dashboardId: dashboardId
    }
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

dashboardTemplatesActions.publishTemplateV2 = async(getAccessToken, cancelTokenSource, templateId, catalog) => {
  const apiUrl = "/analytics/dashboard/add";
  let urlParams = {
    params: {
      catalog: catalog,
      templateId: templateId
    }
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

export default dashboardTemplatesActions;