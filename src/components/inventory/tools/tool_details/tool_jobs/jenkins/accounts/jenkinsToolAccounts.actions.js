import baseActions from "utils/actionsBase";

const jenkinsAccountActions = {};

jenkinsAccountActions.getJenkinsAccountsV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/accounts/jenkins`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

jenkinsAccountActions.createJenkinsAccountV2 = async (getAccessToken, cancelTokenSource, toolId, data) => {
  const apiUrl = `/tools/${toolId}/accounts/jenkins/create`;
  const postBody = {...data?.getPersistData()};

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

jenkinsAccountActions.deleteJenkinsAccountV2 = async (getAccessToken, cancelTokenSource, toolId, accountCredential) => {
  const apiUrl = `/tools/${toolId}/accounts/jenkins/delete`;
  // const apiUrl = `registry/action/jenkins/deleteCredentials`;
  const postBody = {
    ...accountCredential?.getPersistData(),
    id: toolId
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default jenkinsAccountActions;
