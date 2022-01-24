import baseActions from "utils/actionsBase";

const pipelineActivityActions = {};

pipelineActivityActions.getPipelineActivityLogsV3 = async (getAccessToken, cancelTokenSource, id, pipelineActivityFilterModel) => {
  const urlParams = {
    params: {
      search:   pipelineActivityFilterModel?.getData("search"),
      runCount: pipelineActivityFilterModel?.getData("currentRunNumber"),
      fields: ["run_count", "step_name", "action", "message", "status", "createdAt", "step_index"],
      status: pipelineActivityFilterModel?.getFilterValue("status"),
    },
  };

  const apiUrl = `/pipelines/${id}/activity/v2/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

pipelineActivityActions.getLatestPipelineActivityLogsV3 = async (getAccessToken, cancelTokenSource, id, pipelineActivityFilterDto) => {
  const urlParams = {
    params: {
      search: pipelineActivityFilterDto?.getData("search"),
      fields: ["run_count", "step_name", "action", "message", "status", "createdAt"],
      status: pipelineActivityFilterDto?.getFilterValue("status"),
    },
  };

  const apiUrl = `/pipelines/${id}/activity/v2/latest`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

pipelineActivityActions.getSecondaryPipelineActivityLogsV3 = async (getAccessToken, cancelTokenSource, id, pipelineActivityFilterDto) => {
  const urlParams = {
    params: {
      search: pipelineActivityFilterDto?.getData("search"),
      fields: ["run_count", "step_name", "action", "message", "status", "createdAt"],
      status: pipelineActivityFilterDto?.getFilterValue("status"),
    },
  };

  const apiUrl = `/pipelines/${id}/activity/v2/secondary`;
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

pipelineActivityActions.getPipelineActivityLogTree = async (getAccessToken, cancelTokenSource, id, pipelineActivityFilterModel) => {
  const urlParams = {
    params: {
      runCount: pipelineActivityFilterModel?.getData("runCount"),
      search: pipelineActivityFilterModel?.getData("search"),
      status: pipelineActivityFilterModel?.getFilterValue("status"),
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