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
    tag: pipelineCatalogFilterModel?.getData("tag"),
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
  roles,
) => {
  const apiUrl = `/workflow/templates/customer/${pipelineId}`;
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

customerPipelineTemplateCatalogActions.transferCustomerPipelineTemplateOwnership = async (
  getAccessToken,
  cancelTokenSource,
  templateId,
  newOwnerId,
) => {
  const apiUrl = `/workflow/templates/customer/${templateId}/owner/${newOwnerId}`;
  return await baseActions.apiPatchCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

customerPipelineTemplateCatalogActions.updateCustomerPipelineTemplateAccessRoles = async (
  getAccessToken,
  cancelTokenSource,
  templateId,
  accessRoles,
) => {
  const apiUrl = `/workflow/templates/customer/${templateId}/access-roles`;
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