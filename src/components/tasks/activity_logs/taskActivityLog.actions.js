import baseActions from "utils/actionsBase";

export const taskActivityLogActions = {};

taskActivityLogActions.pullLiveLogV2 = async (getAccessToken, cancelTokenSource, taskId, runCount) => {
  const apiUrl = `/tasks/logs/${taskId}/activity/v2/run/${runCount}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

taskActivityLogActions.getTaskActivityLogs = async (getAccessToken, cancelTokenSource, id, runCountArray, taskActivityFilterDto) => {
  const search = taskActivityFilterDto?.getData("search");
  const urlParams = {
    params: {
      search: search ? search : undefined,
      runCountArray: runCountArray,
      fields: ["run_count", "name", "log_type", "type", "message", "status", "createdAt"]
    },
  };

  const apiUrl = `tasks/logs/${id}/activity/v2/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

taskActivityLogActions.getLatestTaskActivityLogs = async (getAccessToken, cancelTokenSource, taskActivityFilterModel, taskId) => {
  const urlParams = {
    params: {
      search: taskActivityFilterModel?.getData("search"),
      status: taskActivityFilterModel?.getFilterValue("status"),
      taskId: taskId,
      fields: ["run_count", "name", "log_type", "type", "message", "status", "createdAt"]
    },
  };

  const apiUrl = `/tasks/logs/activity/v2/latest`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

taskActivityLogActions.getSecondaryTaskActivityLogs = async (getAccessToken, cancelTokenSource, taskActivityFilterModel, taskId) => {
  const urlParams = {
    params: {
      search: taskActivityFilterModel?.getData("search"),
      status: taskActivityFilterModel?.getFilterValue("status"),
      taskId: taskId,
      fields: ["run_count", "name", "log_type", "type", "message", "status", "createdAt"]
    },
  };

  const apiUrl = `/tasks/logs/activity/v2/secondary`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

taskActivityLogActions.getTaskActivityLogsByIdAndRunCount = async (getAccessToken, cancelTokenSource, taskId, runCount, taskActivityFilterModel) => {
  const urlParams = {
    params: {
      search: taskActivityFilterModel?.getData("search"),
      status: taskActivityFilterModel?.getFilterValue("status"),
      fields: ["run_count", "name", "log_type", "type", "message", "status", "createdAt"]
    },
  };

  const apiUrl = `/tasks/${taskId}/${runCount}/logs/activity/v2/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

taskActivityLogActions.getTaskActivityLogTree = async (getAccessToken, cancelTokenSource, id, taskActivityFilterModel) => {
  const apiUrl = `/tasks/logs/${id}/activity/v2/tree`;
  const urlParams = {
    params: {
      search: taskActivityFilterModel?.getData("search"),
      status: taskActivityFilterModel?.getFilterValue("status"),
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

taskActivityLogActions.getTaskActivityLogById = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/tasks/logs/activity/v2/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

taskActivityLogActions.getTaskActivityMetaRecord = async (getAccessToken, cancelTokenSource, taskId, taskRunCount) => {
  const apiUrl = `/tasks/logs/bulk-migration/${taskId}/activity/${taskRunCount}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

taskActivityLogActions.getTaskActivityChunk = async (getAccessToken, cancelTokenSource, recordId, n) => {
  const apiUrl = `/tasks/logs/bulk-migration/chunk/${recordId}/${n}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

taskActivityLogActions.getTaskActivityChunkCount = async (getAccessToken, cancelTokenSource, recordId) => {
  const apiUrl = `/tasks/logs/bulk-migration/chunk/${recordId}/count`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

