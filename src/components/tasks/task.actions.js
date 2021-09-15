import baseActions from "utils/actionsBase";

const taskActions = {};

taskActions.deleteGitTaskV2 = async (getAccessToken, cancelTokenSource, dataObject) => {
  const apiUrl = `/tools/git/${dataObject.getData("_id")}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

taskActions.updateGitTaskV2 = async (getAccessToken, cancelTokenSource, gitTasksDataDto) => {
  const postBody = {
    ...gitTasksDataDto.getPersistData()
  };
  const apiUrl = `/tools/git/${gitTasksDataDto.getData("_id")}/update`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.stopTask = async (getAccessToken, cancelTokenSource, gitTasksDataDto) => {
  const postBody = {
    ...gitTasksDataDto.getPersistData()
  };
  const apiUrl = `/tools/git/${gitTasksDataDto.getData("_id")}/stop`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.createGitTaskV2 = async (getAccessToken, cancelTokenSource, gitTasksDataDto) => {
  const postBody = {
    ...gitTasksDataDto.getPersistData()
  };
  const apiUrl = "/tools/git/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.getGitTasksListV2 = async (getAccessToken, cancelTokenSource, taskFilterModel, fields) => {
  const apiUrl = `/tasks`;
  // TODO: Remove this after verification
  // const apiUrl = `/tools/git/`;
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
      category: taskFilterModel?.getData("category"),
      owner: taskFilterModel?.getFilterValue("owner"),
      fields: fields,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

taskActions.getLovTasksListV2 = async (getAccessToken, cancelTokenSource, type, fields) => {
  const apiUrl = `/tasks`;
  const urlParams = {
    params: {
      sort: "name",
      type: type,
      status: "active",
      fields: fields,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

taskActions.getGitTaskByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/tasks/${id}`;
  // TODO: Remove this after verification
  // const apiUrl = `/tools/git/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

taskActions.getGitTaskAccessForUserEmail = async (getAccessToken, cancelTokenSource, taskFilterModel, email) => {
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

taskActions.getGitTaskActivityLogs = async (gitTasksDataDto, gitTasksActivityFilterDto, getAccessToken) => {
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

taskActions.getAllGitTasksActivityLogs = async (gitTasksActivityFilterDto, getAccessToken) => {
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

taskActions.processSyncRequest = async (postBody, getAccessToken) => {
  const apiUrl = `/tools/git/processSyncRequest`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

taskActions.generateCert = async (getAccessToken, id) => {
  const postBody= {"taskId" : id};
  const apiUrl = `/tasks/generatecert`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

taskActions.getCert = async (getAccessToken, id, cancelTokenSource) => {
  const postBody= {"taskId" : id};
  const apiUrl = `/tasks/getcert`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.getPrivateKey = async (getAccessToken, id, cancelTokenSource) => {
  const postBody= {"taskId" : id};
  const apiUrl = `/tasks/getprivatekey`;
  return await baseActions.apiPostCall(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.syncCertToJenkins = async (getAccessToken, gitTasksDataDto, cancelTokenSource) => {
  const postBody= {"taskId" : gitTasksDataDto.getData("_id"), "jenkinsId": gitTasksDataDto.getData("jenkinsIds")};
  const apiUrl = `/tasks/synchcert`;
  return await baseActions.apiPostCall(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.getTaskActivityLogs = async (getAccessToken, cancelTokenSource, id, runCountArray, taskActivityFilterDto) => {
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

taskActions.getAllTaskActivityLogs = async (getAccessToken, cancelTokenSource, taskNameArray, taskActivityFilterDto) => {
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

taskActions.getTaskActivityLogTree = async (getAccessToken, cancelTokenSource, id, taskActivityFilterDto) => {
  const search = taskActivityFilterDto?.getData("search");
  const urlParams = {
    params: {
      search: search ? search : undefined
    },
  };

  const apiUrl = `/tools/git/logs/${id}/activity/v2/tree`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

taskActions.getTaskActivityLogTypeTree = async (getAccessToken, cancelTokenSource, taskActivityFilterDto) => {
  const search = taskActivityFilterDto?.getData("search");
  const urlParams = {
    params: {
      search: search ? search : undefined
    },
  };

  const apiUrl = `/tools/git/logs/activity/v2/alltaskstree`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

taskActions.getTaskActivityLogById = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/tools/git/logs/activity/v2/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

taskActions.createECSCluster = async (postBody, getAccessToken) => {
  const apiUrl = `/tools/aws/v2/create/ecs`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

taskActions.createECSServoce = async (postBody, getAccessToken) => {
  const apiUrl = `/tools/aws/v2/create/ecs/service`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

taskActions.checkECSStatus = async (postBody, getAccessToken) => {
  const apiUrl = `/tools/aws/v2/ecs/status`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

taskActions.logClusterCancellation = async (getAccessToken, cancelTokenSource, gitTasksDataDto) => {
  const apiUrl = `/tools/aws/v2/cancel/ecs`;
  let postBody = {
    taskId: gitTasksDataDto.getData("_id"),
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.createAKSCluster = async (postBody, getAccessToken) => {
  const apiUrl = `/tools/azure/create/aks`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

taskActions.logAksClusterCancellation = async (getAccessToken, cancelTokenSource, gitTasksDataDto) => {
  const apiUrl = `/tools/azure/cancel/aks`;

  let postBody = {
    taskId: gitTasksDataDto.getData("_id"),
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.logClusterCancellation = async (getAccessToken, cancelTokenSource, gitTasksDataDto) => {
  const apiUrl = `/tools/aws/v2/cancel/ecs`;
  let postBody = {
    taskId: gitTasksDataDto.getData("_id"),
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};


export default taskActions;