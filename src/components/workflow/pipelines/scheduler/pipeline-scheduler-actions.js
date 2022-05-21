import baseActions from "utils/actionsBase";

const pipelineSchedulerActions = {};

pipelineSchedulerActions.getScheduledPipelineTasksV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/scheduler/pipelines/${pipelineId}`;

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineSchedulerActions.createSchedule = async (getAccessToken, cancelTokenSource, scheduledTaskModel) => {
  const postBody = {
    ...scheduledTaskModel.getPersistData()
  };
  const apiUrl = `/scheduler/create`;

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

pipelineSchedulerActions.updateSchedule = async (getAccessToken, cancelTokenSource, scheduledTaskModel) => {
  const postBody = {
    ...scheduledTaskModel.getPersistData()
  };
  const apiUrl = `/scheduler/${scheduledTaskModel.getData("_id")}/update`;

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

pipelineSchedulerActions.deleteScheduledTask = async (getAccessToken, cancelTokenSource, scheduledTaskId) => {
  let apiUrl = `/scheduler/${scheduledTaskId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default pipelineSchedulerActions;