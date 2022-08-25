import baseActions from "utils/actionsBase";

export const taskTemplateActions = {};

taskTemplateActions.createTemplateV2 = async (getAccessToken, cancelTokenSource, taskTemplateModel) => {
  const apiUrl = "/tasks/templates/platform/";
  const postBody = {
    ...taskTemplateModel.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskTemplateActions.updateTemplateV2 = async (getAccessToken, cancelTokenSource, taskTemplateModel) => {
  const apiUrl = `/tasks/templates/platform/${taskTemplateModel.getData("_id")}/`;
  const postBody = {
    ...taskTemplateModel.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskTemplateActions.deleteTemplateV2 = async (getAccessToken, cancelTokenSource, taskTemplateModel) => {
  const apiUrl = `/tasks/templates/platform/${taskTemplateModel.getData("_id")}/`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

taskTemplateActions.getTemplatesV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/tasks/templates/platform";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

taskTemplateActions.getTemplateByIdV2 = async (getAccessToken, cancelTokenSource, templateId) => {
  const apiUrl = `/tasks/templates/platform/${templateId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

taskTemplateActions.getTemplateByIdentifier = async (getAccessToken, cancelTokenSource, taskTemplateIdentifier) => {
  const apiUrl = `/tasks/templates/platform/identifier/${taskTemplateIdentifier}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};