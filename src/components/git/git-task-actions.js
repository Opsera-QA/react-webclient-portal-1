import baseActions from "utils/actionsBase";

const gitTasksActions = {};

// git actions needs to be added here

gitTasksActions.deleteGitTaskV2 = async (getAccessToken, cancelTokenSource, dataObject) => {
  const apiUrl = `/tools/git/${dataObject.getData("_id")}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

gitTasksActions.updateGitTaskV2 = async (getAccessToken, cancelTokenSource, gitTasksDataDto) => {
  const postBody = {
    ...gitTasksDataDto.getPersistData()
  };
  const apiUrl = `/tools/git/${gitTasksDataDto.getData("_id")}/update`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

gitTasksActions.createGitTaskV2 = async (getAccessToken, cancelTokenSource, gitTasksDataDto) => {
  const postBody = {
    ...gitTasksDataDto.getPersistData()
  };
  const apiUrl = "/tools/git/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

gitTasksActions.getGitTasksListV2 = async (getAccessToken, cancelTokenSource, gitTasksDataDto) => {
  let sortOption = gitTasksDataDto.getData("sortOption");

  let urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      page: gitTasksDataDto.getData("currentPage"),
      size: gitTasksDataDto.getData("pageSize"),
      tag: gitTasksDataDto.getFilterValue("tag"),
      type: gitTasksDataDto.getFilterValue("type"),
      status: gitTasksDataDto.getFilterValue("status"),
      tool: gitTasksDataDto.getFilterValue("toolIdentifier"),
      search: gitTasksDataDto.getFilterValue("search")
    }
  };

  const apiUrl = `/tools/git/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

gitTasksActions.getGitTaskByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/tools/git/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

gitTasksActions.getGitTaskActivityLogs = async (gitTasksDataDto, gitTasksActivityFilterDto, getAccessToken) => {
  let sortOption = gitTasksActivityFilterDto.getData("sortOption");
  let urlParams = {
    params: {
      sort: gitTasksActivityFilterDto ? sortOption.value : undefined,
      page: gitTasksActivityFilterDto.getData("currentPage"),
      size: gitTasksActivityFilterDto.getData("pageSize"),
      tag: gitTasksActivityFilterDto.getFilterValue("tag"),
      type: gitTasksActivityFilterDto.getFilterValue("type"),
      status: gitTasksActivityFilterDto.getFilterValue("status"),
      search: gitTasksActivityFilterDto.getFilterValue("search"),
    }
  };

  const apiUrl = `/tools/git/logs/${gitTasksDataDto.getData("_id")}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

gitTasksActions.getAllGitTasksActivityLogs = async ( gitTasksActivityFilterDto, getAccessToken) => {
  let sortOption = gitTasksActivityFilterDto.getData("sortOption");
  let urlParams = {
    params: {
      sort: gitTasksActivityFilterDto ? sortOption.value : undefined,
      page: gitTasksActivityFilterDto.getData("currentPage"),
      size: gitTasksActivityFilterDto.getData("pageSize"),
      tag: gitTasksActivityFilterDto.getFilterValue("tag"),
      type: gitTasksActivityFilterDto.getFilterValue("type"),
      status: gitTasksActivityFilterDto.getFilterValue("status"),
      search: gitTasksActivityFilterDto.getFilterValue("search"),
    }
  };

  const apiUrl = `/tools/git/logs/`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

gitTasksActions.processSyncRequest = async (postBody, getAccessToken) => {
  const apiUrl = `/tools/git/processSyncRequest`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

export default gitTasksActions;