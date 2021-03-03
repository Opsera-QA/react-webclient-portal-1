import baseActions from "utils/actionsBase";

const jenkinsAccountActions = {};

jenkinsAccountActions.createJenkinsAccount = async (data, toolData, getAccessToken) => {
  const postBody = data.getPersistData();
  const apiUrl = "/registry/action/" + toolData["_id"] + "/createcredential";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

jenkinsAccountActions.deleteJenkinsAccount = async (data, toolData, getAccessToken) => {
  const postBody = { ...data.getPersistData(), id: toolData["_id"] };
  const apiUrl = "/registry/action/jenkins/deleteCredentials";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

export default jenkinsAccountActions;
