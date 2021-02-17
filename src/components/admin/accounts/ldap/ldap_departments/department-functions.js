import {axiosApiService} from "../../../../../api/apiService";
import baseActions from "../../../../../utils/actionsBase";

const departmentActions = {};

departmentActions.getDepartmentsByDomainV2 = async (getAccessToken, cancelTokenSource, domain) => {
  let postBody = {
    domain: domain
  };
  const apiUrl = `/users/account/departments`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

departmentActions.getDepartment = async (domain, departmentName, getAccessToken) => {
  let postBody = {
    domain: domain,
    name: departmentName
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/users/account/department`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return error;});
  return response;
};

departmentActions.createDepartment = async (orgDomain, departmentDto, getAccessToken) => {
  let postBody = {
    domain: orgDomain,
    name: departmentDto.getData("name"),
    ownerEmail: departmentDto.getData("ownerEmail")
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/users/account/department/create`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

departmentActions.updateDepartment = async (orgDomain, departmentDto, getAccessToken) => {
  let postData = {
    domain: orgDomain,
    name: departmentDto.getData("name"),
    ownerEmail: departmentDto.getData("ownerEmail"),
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/department/update";
  const response = await axiosApiService(accessToken).put(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

departmentActions.deleteDepartment = async (orgDomain, departmentDto, getAccessToken) => {
  const apiUrl = `/users/account/department/delete?domain=${orgDomain}&name=${departmentDto.getData("name")}`;
  return await baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

departmentActions.syncDepartmentMembership = async (orgDomain, groupName, emailList, getAccessToken) => {
  let postData = {
    domain: orgDomain,
    groupName: groupName,
    emails: emailList,
  };
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group/sync-membership";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

export default departmentActions;