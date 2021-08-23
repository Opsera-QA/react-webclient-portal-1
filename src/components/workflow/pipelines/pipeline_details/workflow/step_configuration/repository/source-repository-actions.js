import baseActions from "utils/actionsBase";

const SourceRepositoryActions = {};

SourceRepositoryActions.registerHook = async (getAccessToken, cancelTokenSource, pipelineOwner, pipelineId, sourceRepositoryModel) => {
  const nodeUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
  const hookUrl = encodeURIComponent(`${nodeUrl}/hooks/${pipelineOwner}/${pipelineId}/source`);
  const apiUrl = `/connectors/${sourceRepositoryModel?.getData("service")}/${sourceRepositoryModel?.getData("accountId")}/hook/create`;
  const queryParams = {
    params: {
      repo: sourceRepositoryModel?.getData("repoId"),
      hook: hookUrl,
      branch: sourceRepositoryModel?.getData("branch"),
      workspace: sourceRepositoryModel?.getData("workspace"),
      repository: sourceRepositoryModel?.getData("repository"),
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

export default SourceRepositoryActions;
