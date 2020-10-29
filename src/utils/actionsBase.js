import {axiosApiService} from "../api/apiService";

const baseActions = {};

baseActions.apiGetCall = async (getAccessToken, apiUrl) => {
  const accessToken = await getAccessToken();
  return axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};

baseActions.apiPostCall = async (getAccessToken, apiUrl, postBody = {}) => {
  const accessToken = await getAccessToken();
  return axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};

baseActions.apiPutCall = async (getAccessToken, apiUrl, postBody = {}) => {
  const accessToken = await getAccessToken();
  return axiosApiService(accessToken).put(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};

baseActions.apiDeleteCall = async (getAccessToken, apiUrl) => {
  const accessToken = await getAccessToken();
  return axiosApiService(accessToken).delete(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};


export default baseActions;