import baseActions from "../../../../../utils/actionsBase";

const pipelineActivityActions = {};

pipelineActivityActions.getPipelineActivityLogs = async (pipelineActivityFilterDto, id, getAccessToken) => {
  const run = pipelineActivityFilterDto.getData("run");
  const search = pipelineActivityFilterDto.getData("search");
  const urlParams = {
    params: {
      // TODO: Write way to construct url or get params from metadata
      size: pipelineActivityFilterDto.getData("pageSize"),
      page: pipelineActivityFilterDto.getData("currentPage"),
      hide_status: pipelineActivityFilterDto.getData("hide_status"),
      run: run > 0 ? [run] : undefined,
      tool: pipelineActivityFilterDto.getData("tool_identifier"),
      search: search !== "" ? search : undefined,
      // step_id: pipelineActivityFilterDto.getData("step_id"),
      latest: pipelineActivityFilterDto.getData("latest"),
    },
  };

  console.log("url params: " + JSON.stringify(urlParams))

  const apiUrl = `/pipelines/${id}/activity`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

export default pipelineActivityActions;