import baseActions from "utils/actionsBase";

const JFrogActions = {};

JFrogActions.getRepos = async (id, type, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/tools/jfrog/repositories/${id}/${type}`;
  let response = await baseActions.apiGetCallV2(getAccessToken,cancelTokenSource, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

JFrogActions.createRepository = async (postBody, getAccessToken, cancelTokenSource) => {
  const apiUrl = '/tools/jfrog/repositories/createRepository';
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

JFrogActions.updateRepository = async (postBody, getAccessToken, cancelTokenSource) => {
  const apiUrl = '/tools/jfrog/repositories/updateRepository';
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

JFrogActions.deleteRepository = async (postBody, getAccessToken, cancelTokenSource) => {
  const apiUrl = '/tools/jfrog/repositories/deleteRepository';
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default JFrogActions;