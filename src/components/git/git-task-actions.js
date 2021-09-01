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

gitTasksActions.getGitTasksListV2 = async (getAccessToken, cancelTokenSource, taskFilterModel) => {
  // TODO: Wire up new route when ready
  // const apiUrl = `/tasks`;
  const apiUrl = `/tools/git/`;
  const sortOption = taskFilterModel?.getData("sortOption");
  const urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      page: taskFilterModel?.getData("currentPage"),
      size: taskFilterModel?.getData("pageSize"),
      tag: taskFilterModel?.getFilterValue("tag"),
      type: taskFilterModel?.getFilterValue("type"),
      status: taskFilterModel?.getFilterValue("status"),
      tool: taskFilterModel?.getFilterValue("toolIdentifier"),
      search: taskFilterModel?.getFilterValue("search"),
      owner: taskFilterModel?.getFilterValue("owner")
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

gitTasksActions.getGitTaskByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/tools/git/${id}`;
  // TODO: Wire up new route when ready
  // const apiUrl = `/tasks/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

gitTasksActions.getGitTaskAccessForUserEmail = async (getAccessToken, cancelTokenSource, taskFilterModel, email) => {
  const sortOption = taskFilterModel?.getData("sortOption");
  const apiUrl = `/tasks/user/${email}`;
  const urlParams = {
    params: {
      sort: sortOption?.value,
      size: taskFilterModel.getData("pageSize"),
      page: taskFilterModel.getData("currentPage"),
      search: taskFilterModel.getFilterValue("search"),
      fields: ["name", "type", "owner", "roles"]
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
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

gitTasksActions.getTaskActivityLogs = async (getAccessToken, cancelTokenSource, id, runCountArray, taskActivityFilterDto) => {
  const search = taskActivityFilterDto?.getData("search");
  const urlParams = {
    params: {
      search: search ? search : undefined,
      runCountArray: runCountArray,
      fields: ["run_count", "name", "log_type", "type", "message", "status", "createdAt"]
    },
  };

  const apiUrl = `/tools/git/logs/${id}/activity/v2/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

gitTasksActions.getAllTaskActivityLogs = async (getAccessToken, cancelTokenSource, taskNameArray, taskActivityFilterDto) => {
  const search = taskActivityFilterDto?.getData("search");
  const urlParams = {
    params: {
      search: search ? search : undefined,
      taskNameArray: taskNameArray,
      fields: ["run_count", "name", "log_type", "type", "message", "status", "createdAt"]
    },
  };

  const apiUrl = `/tools/git/alllogs/activity/v2/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

gitTasksActions.getTaskActivityLogTree = async (getAccessToken, cancelTokenSource, id, taskActivityFilterDto) => {
  const search = taskActivityFilterDto?.getData("search");
  const urlParams = {
    params: {
      search: search ? search : undefined
    },
  };

  const apiUrl = `/tools/git/logs/${id}/activity/v2/tree`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

gitTasksActions.getTaskActivityLogTypeTree = async (getAccessToken, cancelTokenSource, taskActivityFilterDto) => {
  const search = taskActivityFilterDto?.getData("search");
  const urlParams = {
    params: {
      search: search ? search : undefined
    },
  };

  const apiUrl = `/tools/git/logs/activity/v2/alltaskstree`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

gitTasksActions.getTaskActivityLogById = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/tools/git/logs/activity/v2/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

gitTasksActions.createECSCluster = async (postBody, getAccessToken) => {
  const apiUrl = `/tools/aws/v2/create/ecs`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

gitTasksActions.createECSServoce = async (postBody, getAccessToken) => {
  const apiUrl = `/tools/aws/v2/create/ecs/service`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

gitTasksActions.checkECSStatus = async (postBody, getAccessToken) => {
  const apiUrl = `/tools/aws/v2/ecs/status`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

gitTasksActions.generateCert = async (getAccessToken, id) => {
  const postBody= {"taskId" : id};
  const apiUrl = `/tasks/generatecert`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

gitTasksActions.getCert = async (getAccessToken, id, cancelTokenSource) => {
  const postBody= {"taskId" : id};
  const apiUrl = `/tasks/getcert`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

gitTasksActions.getPrivateKey = async (getAccessToken, id, cancelTokenSource) => {
  const postBody= {"taskId" : id};
  const apiUrl = `/tasks/getprivatekey`;
  return await baseActions.apiPostCall(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

gitTasksActions.syncCertToJenkins = async (getAccessToken, gitTasksDataDto, cancelTokenSource) => {
  const postBody= {"taskId" : gitTasksDataDto.getData("_id"), "jenkinsId": gitTasksDataDto.getData("jenkinsIds")};
  const apiUrl = `/tasks/synchcert`;
  return await baseActions.apiPostCall(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

gitTasksActions.logClusterCancellation = async (getAccessToken, cancelTokenSource, gitTasksDataDto) => {
  const apiUrl = `/tools/aws/v2/cancel/ecs`;
  let postBody = {
    taskId: gitTasksDataDto.getData("_id"),
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};


export default gitTasksActions;