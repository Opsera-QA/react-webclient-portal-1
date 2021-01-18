import {axiosApiService} from "../../../../api/apiService";

const sfdcPipelineActions = {};

sfdcPipelineActions.getComponentTypes = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/sfdc/component-types`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

sfdcPipelineActions.getModifiedFiles = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/sfdc/modified-files`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

sfdcPipelineActions.generateXML = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/sfdc/generatexml`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

sfdcPipelineActions.createJobs = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/sfdc/set-jobs`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

sfdcPipelineActions.setTestClassesList = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/sfdc/getTestClasses`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

sfdcPipelineActions.getListFromPipelineStorage = async (postBody, toolFilterDto, getAccessToken) => {
  postBody.page = toolFilterDto ? toolFilterDto.getData("currentPage") : 0;
  postBody.size = toolFilterDto ? toolFilterDto.getData("pageSize") : 50;
  postBody.search = toolFilterDto ? toolFilterDto.getData("search") : "";
  postBody.classFilter = toolFilterDto ? toolFilterDto.getData("classFilter") : "";
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/storage/get`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

sfdcPipelineActions.setListToPipelineStorage = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/storage/update`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

sfdcPipelineActions.getProfileComponentList = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/sfdc/getprofilecomponentlist`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

// setSelectedComponents

sfdcPipelineActions.setSelectedComponents = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/sfdc/setselectedcomponents`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

export default sfdcPipelineActions;