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
  const apiUrl = `/workflow/templates/customer/${templateId}`;

  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

customerPipelineTemplateCatalogActions.publishPipelineToCustomerCatalog = async (
  getAccessToken,
  cancelTokenSource,
  pipelineId,
) => {
  const apiUrl = `/workflow/templates/customer/${pipelineId}`;
  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

customerPipelineTemplateCatalogActions.updateCustomerPipelineTemplate = async (
  getAccessToken,
  cancelTokenSource,
  templateId,
  pipelineTemplateModel,
) => {
  const apiUrl = `/workflow/templates/customer/${templateId}`;
  return await baseActions.apiPutCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    pipelineTemplateModel?.getPersistData(),
  );
};

customerPipelineTemplateCatalogActions.deleteCustomerPipelineTemplate = async (
  getAccessToken,
  cancelTokenSource,
  templateId,
) => {
  const apiUrl = `/workflow/templates/customer/${templateId}`;
  return await baseActions.apiDeleteCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};