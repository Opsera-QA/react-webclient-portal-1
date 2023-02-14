import baseActions from "utils/actionsBase";
import {NODE_API_ORCHESTRATOR_SERVER_URL} from "config";

const SourceRepositoryActions = {};

SourceRepositoryActions.registerHook = async (getAccessToken, cancelTokenSource, pipelineOwner, pipelineId, sourceRepositoryModel) => {
  const nodeUrl = NODE_API_ORCHESTRATOR_SERVER_URL;
  const hookUrl = encodeURIComponent(`${nodeUrl}/hooks/${pipelineOwner}/${pipelineId}/source`);
  const apiUrl = `/connectors/${sourceRepositoryModel?.getData("service")}/${sourceRepositoryModel?.getData("accountId")}/hook/create`;
  const queryParams = {
    params: {
      repo: sourceRepositoryModel?.getData("repoId"),
      projectId: sourceRepositoryModel?.getData("projectId"),
      hook: hookUrl,
      branch: sourceRepositoryModel?.getData("branch"),
      workspace: sourceRepositoryModel?.getData("workspace"),
      repository: sourceRepositoryModel?.getData("repository"),
      isPushEvent: sourceRepositoryModel?.getData("isPushEvent"),
      isPrEvent: sourceRepositoryModel?.getData("isPrEvent")
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};


SourceRepositoryActions.exportToGitlab = async (getAccessToken, cancelTokenSource, pipelineId, service, gitToolId,) => {
  const postBody = {
    pipelineId,
    gitToolId
  };
  const apiUrl = `tool/git-operations/${service}/export-pipeline`;

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};


export default SourceRepositoryActions;
