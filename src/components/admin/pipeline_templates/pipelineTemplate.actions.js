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

pipelineTemplateActions.deployTemplateByIdentifierV2 = async (getAccessToken, cancelTokenSource, identifier) => {
  const apiUrl = `/pipelines/workflows/platform/identifier/${identifier}/deploy`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineTemplateActions.getPipelineTemplateByIdentifierV2 = async (getAccessToken, cancelTokenSource, identifier) => {
  let apiUrl = `/pipelines/workflows/platform/identifier/${identifier}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default pipelineTemplateActions;