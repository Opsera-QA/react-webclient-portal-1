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

export default pipelineActivityActions;