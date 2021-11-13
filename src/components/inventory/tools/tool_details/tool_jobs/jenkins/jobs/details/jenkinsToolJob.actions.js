import baseActions from "utils/actionsBase";

const jenkinsToolJobActions = {};

jenkinsToolJobActions.getJenkinsJobs = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/tools/${id}/jobs/jenkins`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

jenkinsToolJobActions.updateJenkinsJob = async (getAccessToken, cancelTokenSource, toolId, jenkinsJobData) => {
  const apiUrl = `/tools/${toolId}/jobs/jenkins/${jenkinsJobData?.getData("_id")}/update`;
  const postBody = {
    ...jenkinsJobData?.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

jenkinsToolJobActions.createJenkinsJob = async (getAccessToken, cancelTokenSource, toolId, jenkinsJobData) => {
  const apiUrl = `/tools/${toolId}/jobs/jenkins/create`;
  const postBody = {
    ...jenkinsJobData?.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

jenkinsToolJobActions.deleteJenkinsJob = async (getAccessToken, cancelTokenSource, toolId, jenkinsJobId) => {
  const apiUrl =`/tools/${toolId}/jobs/jenkins/${jenkinsJobId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default jenkinsToolJobActions;
