import baseActions from "utils/actionsBase";

const pipelineActivityActions = {};

pipelineActivityActions.getPipelineActivityLogsV2 = async (getAccessToken, cancelTokenSource, pipelineActivityFilterDto, runCount, id) => {
  const run = pipelineActivityFilterDto.getData("run");
  const latest = pipelineActivityFilterDto.getData("latest");

  const runArray = [];

  if (run > 0) {
    runArray.push(run);
  }

  if (latest === true && !runArray.includes(runCount)) {
    runArray.push(runCount);
  }

  const search = pipelineActivityFilterDto.getData("search");
  const urlParams = {
    params: {
      // TODO: Write way to construct url or get params from metadata
      size: pipelineActivityFilterDto.getData("pageSize"),
      page: pipelineActivityFilterDto.getData("currentPage"),
      hide_status: pipelineActivityFilterDto.getData("hide_status"),
      run: runArray.length > 0 ? runArray : undefined,
      tool: pipelineActivityFilterDto.getData("tool_identifier"),
      search: search !== "" ? search : undefined,
      // step_id: pipelineActivityFilterDto.getData("step_id"),
    },
  };

  const apiUrl = `/pipelines/${id}/activity`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

pipelineActivityActions.getPipelineActivityLogsV3 = async (getAccessToken, cancelTokenSource, id, runCountArray, pipelineActivityFilterDto, otherLogsQuery) => {
  const search = pipelineActivityFilterDto?.getData("search");
  const urlParams = {
    params: {
      search: search,
      runCountArray: runCountArray,
      fields: ["run_count", "step_name", "action", "message", "status", "createdAt"],
      showOtherLogs: otherLogsQuery === true ? true : undefined
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
      search: search ? search : undefined
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