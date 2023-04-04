import baseActions from "utils/actionsBase";

const githubBaseURL = "analytics/github/v1/";

const githubActions = {};

githubActions.githubRepositoryList = async (
  getAccessToken,
  cancelTokenSource,
) => {
  // TODO FILTER WITH TAGS
  const apiUrl = githubBaseURL + "githubRepositoryList";
  const postBody = {
    size: 10,
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

githubActions.githubBranchList = async (getAccessToken, cancelTokenSource) => {
  // TODO FILTER WITH TAGS
  const apiUrl = githubBaseURL + "githubBranchList";
  const postBody = {
    size: 10,
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

export default githubActions;
