import baseActions from "utils/actionsBase";

const pipelineSchedulerActions = {};

pipelineSchedulerActions.getScheduledTasks = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const urlParams = {
    params: {
      pipelineId: pipelineId,
    }
  };
  const apiUrl = `/scheduler/`;

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
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