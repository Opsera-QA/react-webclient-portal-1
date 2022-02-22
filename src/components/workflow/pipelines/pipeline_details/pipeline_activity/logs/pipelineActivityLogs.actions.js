import baseActions from "utils/actionsBase";

const pipelineActivityLogsActions = {};

pipelineActivityLogsActions.getPipelineActivityLogsV3 = async (getAccessToken, cancelTokenSource, id, pipelineActivityFilterModel, currentRunNumber) => {
  const urlParams = {
    params: {
      search:   pipelineActivityFilterModel?.getData("search"),
      runCount: currentRunNumber,
      fields: ["run_count", "step_name", "action", "message", "status", "createdAt", "step_index"],
      status: pipelineActivityFilterModel?.getFilterValue("status"),
    },
  };

  const apiUrl = `/pipelines/${id}/activity/v2/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

pipelineActivityLogsActions.getLatestPipelineActivityLogsV3 = async (getAccessToken, cancelTokenSource, id, pipelineActivityFilterDto) => {
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

pipelineActivityLogsActions.getSecondaryPipelineActivityLogsV3 = async (getAccessToken, cancelTokenSource, id, pipelineActivityFilterDto) => {
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

pipelineActivityLogsActions.getPipelineActivityLogsByRunNumber = async (getAccessToken, cancelTokenSource, pipelineId, stepId, runNumber, stepName, action) => {
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

pipelineActivityLogsActions.getPipelineActivityLogById = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/pipelines/activity/v2/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActivityLogsActions.getPipelineDurationMetricsV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/activity/v2/metrics`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default pipelineActivityLogsActions;