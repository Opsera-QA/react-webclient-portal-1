import {axiosApiService} from "../../../../../api/apiService";

const departmentActions = {};

departmentActions.getDepartmentsByDomain = async (domain, getAccessToken) => {
  let postBody = {
    domain: domain
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/users/account/departments`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return error;});
  return response;
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
  let postData = {
    domain: orgDomain,
    name: departmentDto.getData("name"),
  }
  const accessToken = await getAccessToken();
  const apiUrl = `/users/account/department/delete`;
  const response = await axiosApiService(accessToken).delete(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

export default departmentActions;