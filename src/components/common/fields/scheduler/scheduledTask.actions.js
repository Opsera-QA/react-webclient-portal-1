import baseActions from "utils/actionsBase";

export const scheduledTaskActions = {};

scheduledTaskActions.getScheduledPipelineTasksV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/scheduler/pipelines/${pipelineId}`;

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

scheduledTaskActions.getScheduledTaskTasksV2 = async (getAccessToken, cancelTokenSource, taskId) => {
  const apiUrl = `/scheduler/tasks/${taskId}`;

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

scheduledTaskActions.createScheduledTaskV2 = async (getAccessToken, cancelTokenSource, scheduledTaskModel) => {
  const postBody = {
    ...scheduledTaskModel.getPersistData()
  };
  const apiUrl = `/scheduler/create`;

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

scheduledTaskActions.updateScheduledTaskV2 = async (getAccessToken, cancelTokenSource, scheduledTaskModel) => {
  const postBody = {
    ...scheduledTaskModel.getPersistData()
  };
  const apiUrl = `/scheduler/${scheduledTaskModel.getData("_id")}/update`;

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

scheduledTaskActions.deleteScheduledTaskV2 = async (getAccessToken, cancelTokenSource, scheduledTaskId) => {
  let apiUrl = `/scheduler/${scheduledTaskId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};
