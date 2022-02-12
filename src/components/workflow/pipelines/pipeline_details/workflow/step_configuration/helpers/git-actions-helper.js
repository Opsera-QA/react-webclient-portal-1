import baseActions from "utils/actionsBase";

const GitActionsHelper = {};

GitActionsHelper.getReviewersV2 = async (getAccessToken, cancelTokenSource, service, gitAccountId, repoId, workspaces) => {
  const apiUrl = "/tools/properties";
  const postBody = {
    tool: service,
    metric: "getReviewers",
    gitAccountId: gitAccountId,
    repoId: repoId,
    workspaces: workspaces
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default GitActionsHelper;
