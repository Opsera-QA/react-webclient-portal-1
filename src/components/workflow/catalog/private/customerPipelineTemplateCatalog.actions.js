import baseActions from "utils/actionsBase";

export const customerPipelineTemplateCatalogActions = {};

customerPipelineTemplateCatalogActions.getCustomerCatalogPipelineTemplates = async (
  getAccessToken,
  cancelTokenSource,
  pipelineCatalogFilterModel,
) => {
  const apiUrl = "/workflow/templates/customer";
  const urlParams = {
    sort: pipelineCatalogFilterModel?.getFilterValue("sortOption"),
    page: pipelineCatalogFilterModel?.getFilterValue("currentPage"),
    size: pipelineCatalogFilterModel?.getFilterValue("pageSize"),
    search: pipelineCatalogFilterModel?.getFilterValue("search"),
    type: pipelineCatalogFilterModel?.getFilterValue("type"),
  };

  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    urlParams,
  );
};

customerPipelineTemplateCatalogActions.getCustomerCatalogPipelineTemplateById = async (
  getAccessToken,
  cancelTokenSource,
  templateId,
) => {
  const apiUrl = "/workflow/templates/customer";

  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    urlParams,
  );
};

customerPipelineTemplateCatalogActions.publishTemplateV2 = async (
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

customerPipelineTemplateCatalogActions.deployCustomerTemplate = async (
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

customerPipelineTemplateCatalogActions.deleteTemplate = async (
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