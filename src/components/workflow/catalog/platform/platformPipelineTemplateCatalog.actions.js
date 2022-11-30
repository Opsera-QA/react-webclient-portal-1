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

platformPipelineTemplateCatalogActions.createPlatformPipelineTemplate = async (
  getAccessToken,
  cancelTokenSource,
  pipelineTemplateModel,
) => {
  const apiUrl = `/workflow/templates/platform/`;
  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    pipelineTemplateModel?.getPersistData(),
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

// platformPipelineTemplateCatalogActions.transferPlatformPipelineTemplateOwnership = async (
//   getAccessToken,
//   cancelTokenSource,
//   templateId,
//   newOwnerId,
// ) => {
//   const apiUrl = `/workflow/templates/platform/${templateId}/owner/${newOwnerId}`;
//   return await baseActions.apiPatchCallV2(
//     getAccessToken,
//     cancelTokenSource,
//     apiUrl,
//   );
// };

platformPipelineTemplateCatalogActions.updatePlatformPipelineTemplateAccessRoles = async (
  getAccessToken,
  cancelTokenSource,
  templateId,
  accessRoles,
) => {
  const apiUrl = `/workflow/templates/platform/${templateId}/access-roles`;
  const postBody = {
    roles: accessRoles,
  };

  return await baseActions.apiPatchCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

platformPipelineTemplateCatalogActions.deployPlatformTemplateByIdentifier = async (getAccessToken, cancelTokenSource, identifier) => {
  const apiUrl = `/workflow/templates/platform/identifier/${identifier}/deploy`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

platformPipelineTemplateCatalogActions.getPlatformPipelineTemplateByIdentifier = async (getAccessToken, cancelTokenSource, identifier) => {
  const apiUrl = `/workflow/templates/platform/identifier/${identifier}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};
