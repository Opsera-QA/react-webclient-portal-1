import baseActions from "utils/actionsBase";

const pipelineTemplateActions = {};

pipelineTemplateActions.updateTemplate = async (templateDataDto, getAccessToken) => {
  const postBody = {
    ...templateDataDto.getPersistData()
  };
  const apiUrl = `/pipelines/workflows/${templateDataDto.getData("_id")}/update`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

pipelineTemplateActions.updateTemplateV2 = async (getAccessToken, cancelTokenSource, templateDataDto) => {
  let postBody = {
    ...templateDataDto.getPersistData(),
  };
  const apiUrl = `/pipelines/workflows/${templateDataDto.getData("_id")}/update`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

// TODO: Move to platformPipelineTemplateCatalog.actions
pipelineTemplateActions.deployTemplateByIdentifierV2 = async (getAccessToken, cancelTokenSource, identifier) => {
  const apiUrl = `/workflow/templates/platform/identifier/${identifier}/deploy`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

// TODO: Move to platformPipelineTemplateCatalog.actions
pipelineTemplateActions.getPipelineTemplateByIdentifierV2 = async (getAccessToken, cancelTokenSource, identifier) => {
  const apiUrl = `/workflow/templates/platform/identifier/${identifier}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default pipelineTemplateActions;