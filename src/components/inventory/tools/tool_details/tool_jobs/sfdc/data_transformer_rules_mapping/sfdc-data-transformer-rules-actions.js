import baseActions from "utils/actionsBase";

const sfdcDataTransformerRulesActions = {};

sfdcDataTransformerRulesActions.getDataTransformerRules = async (getAccessToken, cancelTokenSource, toolID) => {
  const apiUrl = `/tools/${toolID}/sfdc/dataTransformerRules`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcDataTransformerRulesActions.createDataTransformerRule = async (getAccessToken, cancelTokenSource, toolID, model) => {
  const postBody = model.getPersistData();
  delete postBody.isXml;
  const apiUrl = `/tools/${toolID}/sfdc/dataTransformerRules`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcDataTransformerRulesActions.updateDataTransformerRule = async (getAccessToken, cancelTokenSource, toolID, ruleId, model) => {
  const postBody = model.getPersistData();
  const apiUrl = `/tools/${toolID}/sfdc/dataTransformerRules/${ruleId}`;
  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcDataTransformerRulesActions.deleteDataTransformerRule = async (getAccessToken, cancelTokenSource, toolID, ruleId) => {
  const apiUrl = `/tools/${toolID}/sfdc/dataTransformerRules/${ruleId}/`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcDataTransformerRulesActions.getComponentTypes = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/sfdc/componentTypes`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default sfdcDataTransformerRulesActions;
