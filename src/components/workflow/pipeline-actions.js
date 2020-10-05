import {axiosApiService} from "../../api/apiService";

const pipelineActions = {};

pipelineActions.getPipelines = async (currentPage, pageSize, sortOption, type, getAccessToken) => {
  const accessToken = await getAccessToken();
  let apiUrl = `/pipelines?page=${currentPage}&size=${pageSize}&sort=${sortOption.name}&order=${sortOption.order}`;

  console.log("Type: " + JSON.stringify(type))
  if (type != null && type !== "all") {
    apiUrl += `&type=${type}`;
  }

  // console.log("Api url: " + JSON.stringify(apiUrl))
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    // TODO: Always throw error for easier catching on page
    .catch(error => {throw error;});
  return response;
};

pipelineActions.delete = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/delete`;  
  const response = await axiosApiService(accessToken).delete(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

pipelineActions.run = async (pipelineId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/run/`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.cancel = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/reset/`;   
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.updatePipeline = async (pipelineId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/update/`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.get = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}`;   
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.saveToVault = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/vault";   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.createJob = async (toolId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/action/${toolId}/createjob`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

//TODO: This should replace createJob above as this logic will lookup the settings in the pipeline, run create job and then update pipeline with job name.
pipelineActions.processStepJob = async (pipelineId, stepId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/action/jenkins/process-step-job?step=${stepId}`;
  const response = await axiosApiService(accessToken).put(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.duplicate = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/duplicate/`;   
  const response = await axiosApiService(accessToken).put(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.publish = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/publish-template/`;
  const response = await axiosApiService(accessToken).put(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.getLogs = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/status`;   
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.deployTemplate = async (templateId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/deploy/${templateId}`;
  const postBody = {};
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.approve = async (templateId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${templateId}/approve`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.deny = async (templateId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${templateId}/deny`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};


pipelineActions.getToolsList = async (service, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/properties/${service}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {
      if (result.data) {
        let respObj = [];
        let arrOfObj = result.data;
        arrOfObj.map((item) => {
          respObj.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
            accounts: item.accounts,
            jobs: item.jobs,
          });
        });
        return respObj;
      }
      else {
        throw "Tool information is missing or unavailable!  Please ensure the required creds are registered and up to date in Tool Registry.";
      }
    })
    .catch(error => {throw { error };});
  return response;
};


export default pipelineActions;