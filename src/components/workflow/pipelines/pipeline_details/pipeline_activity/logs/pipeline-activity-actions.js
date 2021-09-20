import baseActions from "utils/actionsBase";

const pipelineActivityActions = {};

pipelineActivityActions.getPipelineActivityLogsV3 = async (getAccessToken, cancelTokenSource, id, runCountArray, pipelineActivityFilterDto, otherLogsQuery) => {
  const search = pipelineActivityFilterDto?.getData("search");
  const urlParams = {
    params: {
      search: search,
      runCountArray: runCountArray,
      fields: ["run_count", "step_name", "action", "message", "status", "createdAt"],
      showOtherLogs: otherLogsQuery === true ? true : undefined,
      status: pipelineActivityFilterDto?.getFilterValue("status"),
    },
  };

  const apiUrl = `/pipelines/${id}/activity/v2/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

pipelineActivityActions.getPipelineActivityLogsByRunNumber = async (getAccessToken, cancelTokenSource, pipelineId, stepId, runNumber, stepName, action) => {
  const apiUrl = `/pipelines/${pipelineId}/activity/v2/run/${runNumber}`;
  const urlParams = {
    params: {
      fields: ["run_count", "pipeline_id", "step_id", "step_name", "action", "api_response", "status", "createdAt"],
      stepName: stepName,
      action: action,
      stepId: stepId,
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

pipelineActivityActions.getPipelineActivityLogTree = async (getAccessToken, cancelTokenSource, id, pipelineActivityFilterDto) => {
  const search = pipelineActivityFilterDto?.getData("search");
  const urlParams = {
    params: {
      search: search ? search : undefined,
      status: pipelineActivityFilterDto?.getFilterValue("status"),
    },
  };

  const apiUrl = `/pipelines/${id}/activity/v2/tree`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

pipelineActivityActions.getPipelineActivityLogById = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/pipelines/activity/v2/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default pipelineActivityActions;