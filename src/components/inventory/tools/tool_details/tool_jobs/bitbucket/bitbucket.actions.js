import baseActions from "utils/actionsBase";

export const bitbucketActions = {};

bitbucketActions.getWorkspacesFromBitbucketInstanceV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/bitbucket/workspaces`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

bitbucketActions.getRepositoriesFromBitbucketInstanceV2 = async (getAccessToken, cancelTokenSource, toolId, workspace) => {
  const apiUrl = `/tools/${toolId}/bitbucket/repositories`;
  const queryParams = {
    params: {
      workspace: workspace,
    },
  };
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

