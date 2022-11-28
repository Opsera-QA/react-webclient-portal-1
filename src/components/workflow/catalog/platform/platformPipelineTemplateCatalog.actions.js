import baseActions from "utils/actionsBase";

export const platformPipelineTemplateCatalogActions = {};

platformPipelineTemplateCatalogActions.getCustomerCatalogPipelineTemplates = async (
  getAccessToken,
  cancelTokenSource,
  pipelineCatalogFilterModel,
) => {
  const apiUrl = "/workflow/templates/platform";
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

platformPipelineTemplateCatalogActions.getCustomerCatalogPipelineTemplateById = async (
  getAccessToken,
  cancelTokenSource,
  templateId,
) => {
  const apiUrl = `/workflow/templates/platform/${templateId}`;

  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

platformPipelineTemplateCatalogActions.publishPipelineToCustomerCatalog = async (
  getAccessToken,
  cancelTokenSource,
  pipelineId,
  roles,
) => {
  const apiUrl = `/workflow/templates/platform/${pipelineId}`;
  const postBody = {
    roles: roles,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

platformPipelineTemplateCatalogActions.updateCustomerPipelineTemplate = async (
  getAccessToken,
  cancelTokenSource,
  templateId,
  pipelineTemplateModel,
) => {
  const apiUrl = `/workflow/templates/platform/${templateId}`;
  return await baseActions.apiPutCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    pipelineTemplateModel?.getPersistData(),
  );
};

platformPipelineTemplateCatalogActions.deleteCustomerPipelineTemplate = async (
  getAccessToken,
  cancelTokenSource,
  templateId,
) => {
  const apiUrl = `/workflow/templates/platform/${templateId}`;
  return await baseActions.apiDeleteCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};