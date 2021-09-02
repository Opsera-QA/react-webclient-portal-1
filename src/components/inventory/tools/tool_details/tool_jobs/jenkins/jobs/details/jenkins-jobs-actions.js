import baseActions from "utils/actionsBase";

const jenkinsJobsActions = {};

jenkinsJobsActions.updateJenkinsJobs = async (getAccessToken, cancelTokenSource, toolData, jenkinsJobData) => {
  const apiUrl = `/registry/${toolData?.getData("_id")}/update`;
  let toolDataSet = { ...toolData.getPersistData() };
  const data = jenkinsJobData?.getPersistData();
  let index = toolDataSet?.jobs?.findIndex((el) => el._id === data._id);

  toolDataSet.jobs[index] = {
    active: true,
    configuration: data.configuration,
    description: data.description,
    name: data.name,
    type: data.type,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, {...toolDataSet});
};

jenkinsJobsActions.createJenkinsJobs = async (getAccessToken, cancelTokenSource, toolData, jenkinsJobData) => {
  const apiUrl = `/registry/${toolData?.getData("_id")}/update`;
  const data = jenkinsJobData?.getPersistData();
  let toolDataSet = { ...toolData.getPersistData() };
  let jobs = Array.isArray(toolDataSet?.jobs) ? toolDataSet?.jobs : [];

  const newJob = {
    active: true,
    configuration: data?.configuration,
    description: data?.description,
    name: data?.name,
    type: data.type,
  };

  jobs.push(newJob);
  toolDataSet.jobs = jobs;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, {...toolDataSet});
};

jenkinsJobsActions.deleteJenkinsJobs = async (getAccessToken, cancelTokenSource, toolData, jenkinsJobData) => {
  const apiUrl =`/registry/${toolData?.getData("_id")}/update`;
   const jobData = jenkinsJobData?.getPersistData();
   const toolDataSet = {...toolData.getPersistData()};

   if (Object.keys(jobData).length > 0) {
    let index = toolDataSet.jobs.findIndex((job) => job._id === jobData._id);
    toolDataSet.jobs.splice(index, 1);
  }

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, {...toolDataSet});
};

export default jenkinsJobsActions;
