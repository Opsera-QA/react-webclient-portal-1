import {axiosApiService} from "../../../../api/apiService";
import baseActions from "utils/actionsBase";

const sfdcPipelineActions = {};

sfdcPipelineActions.getComponentTypes = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/sfdc/component-types`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

sfdcPipelineActions.getComponentTypesV2 = async (getAccessToken, cancelTokenSource, sfdcToolId, isProfiles) => {
  const apiUrl = `/pipelines/sfdc/component-types`;
  const postBody = {
    "sfdcToolId": sfdcToolId,
    "isProfiles": isProfiles
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.getModifiedFiles = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/sfdc/modified-files`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

sfdcPipelineActions.getModifiedFilesV2 = async (getAccessToken, cancelTokenSource, postBody) => {
  const apiUrl = `/pipelines/sfdc/modified-files`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.generateXML = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/sfdc/generatexml`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

sfdcPipelineActions.generateProfileXML = async (getAccessToken, cancelTokenSource, postBody) => {
  const apiUrl = `/pipelines/sfdc/generate_profile_xml`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
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

sfdcPipelineActions.getListFromPipelineStorageV2 = async (getAccessToken, cancelTokenSource, postBody) => {
  const apiUrl = `/pipelines/storage/get_v2`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.getSfdcComponentListFromPipelineStorageV2 = async (getAccessToken, cancelTokenSource, postBody) => {
  const apiUrl = `/pipelines/storage/get/components`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.setListToPipelineStorage = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/storage/update`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

sfdcPipelineActions.setListToPipelineStorageV2 = async (getAccessToken, cancelTokenSource, postBody) => {
  const apiUrl = `/pipelines/storage/update_v2`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
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

sfdcPipelineActions.setSelectedComponentsV2 = async (getAccessToken, cancelTokenSource, postBody) => {
  const apiUrl = `/pipelines/sfdc/setselectedcomponents`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};
// process and set csv data

sfdcPipelineActions.uploadCSVData = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/sfdc/processcsv`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

// git task create job and trigger
sfdcPipelineActions.gitTaskTrigger = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/sfdc/gittask`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

// sfdcPipelineActions.gitSFDCBranchConversionTrigger = async (getAccessToken, gitTasksDataDto) => {
//   const postBody = {
//     "gitTaskId":gitTasksDataDto.getData("_id")
//   };
//   const apiUrl = "/pipelines/sfdc/gitbranchconversion";
//   return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
// };

export default sfdcPipelineActions;