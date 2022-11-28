import baseActions from "utils/actionsBase";

export const platformPipelineTemplateCatalogActions = {};

platformPipelineTemplateCatalogActions.getPlatformCatalogPipelineTemplates = async (
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

platformPipelineTemplateCatalogActions.getPlatformCatalogPipelineTemplateById = async (
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

platformPipelineTemplateCatalogActions.publishPipelineToPlatformCatalog = async (
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

platformPipelineTemplateCatalogActions.updatePlatformPipelineTemplate = async (
  getAccessToken,
  cancelTokenSource,
  pipelineTemplateModel,
) => {
  const apiUrl = `/workflow/templates/platform/${pipelineTemplateModel?.getMongoDbId()}`;
  return await baseActions.apiPutCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    pipelineTemplateModel?.getPersistData(),
  );
};

platformPipelineTemplateCatalogActions.deletePlatformPipelineTemplate = async (
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