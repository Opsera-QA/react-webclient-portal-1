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
  const apiUrl = `/pipelines/${pipelineId}/action/`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

pipelineActions.cancel = async (pipelineId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/action/`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};


export default pipelineActions;