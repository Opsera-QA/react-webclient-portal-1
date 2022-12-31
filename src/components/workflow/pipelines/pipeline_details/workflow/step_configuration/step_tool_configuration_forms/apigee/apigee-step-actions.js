import baseActions from "utils/actionsBase";

const apigeeStepActions = {};

apigeeStepActions.getApigeeEnvironments = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `tools/${toolId}/apigee/getEnvironments`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

apigeeStepActions.getApigeeAssets = async (getAccessToken, cancelTokenSource, toolId, data) => {
  const apiUrl = `tools/${toolId}/apigee/getAssets`;

  const postData = {
    data
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

apigeeStepActions.fetchVersionsAndDependencies = async (getAccessToken, cancelTokenSource, toolId, data) => {
  const apiUrl = `tools/${toolId}/apigee/fetchVersionsAndDependencies`;

  const postData = {
    data
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};


export default apigeeStepActions;
