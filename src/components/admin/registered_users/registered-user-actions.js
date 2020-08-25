import { axiosApiService } from "api/apiService";

const RegisteredUserActions = {};

RegisteredUserActions.getUserDetail = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/analytics/profile/user/${userId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

RegisteredUserActions.getTools = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/tools?hidden=true`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};


RegisteredUserActions.update = async (recordId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/analytics/profile/${recordId}/update/`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

export default RegisteredUserActions;