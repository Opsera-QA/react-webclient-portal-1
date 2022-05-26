import baseActions from "utils/actionsBase";

const sfdxScanActions = {};

sfdxScanActions.getSfdxScanMappings = async (getAccessToken, cancelTokenSource, toolID) => {
  const apiUrl = `/tools/${toolID}/sfdc-scan/mappings`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdxScanActions.createRule = async (getAccessToken, cancelTokenSource, toolID, pmdRuleModel) => {
  const postBody = pmdRuleModel.getPersistData();
  const apiUrl = `/tools/${toolID}/sfdc-scan/createrule`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdxScanActions.updateRule = async (getAccessToken, cancelTokenSource, toolID, ruleId, pmdRuleModel) => {
  const postBody = pmdRuleModel.getPersistData();
  const apiUrl = `/tools/${toolID}/sfdc-scan/${ruleId}/updaterule`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdxScanActions.deleteRule = async (getAccessToken, cancelTokenSource, toolID, ruleId) => {
  const apiUrl = `/tools/${toolID}/sfdc-scan/${ruleId}/`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default sfdxScanActions;
