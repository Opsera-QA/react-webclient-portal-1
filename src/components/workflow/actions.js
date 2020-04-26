import { axiosApiService } from "../../api/apiService";
const pipelineActions = {};

pipelineActions.delete = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/delete`;  
  const response = await axiosApiService(accessToken).delete(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return error;});
  return response;
};

pipelineActions.run = async (pipelineId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/run/`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

/* pipelineActions.action = async (pipelineId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/action/`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
}; */

pipelineActions.cancel = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/reset/`;   
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

pipelineActions.save = async (pipelineId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/update/`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

pipelineActions.get = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}`;   
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};


export default pipelineActions;