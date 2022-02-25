const axios = require("axios");
const config = require("../config");

// TODO: Rework this file to be like nodeAnalyticsApiService
function getAxiosInstance(token, cancelToken) {
  const axiosInstance = axios.create({
    baseURL: config.apiServerUrl,
    timeout: 50000,
    cancelToken: cancelToken
  });

  axiosInstance.defaults.timeoutErrorMessage = `
    Access timeout reached. A timeout like this can occur due to intermittent networking or connectivity issues.  
    Please try refreshing the page or waiting a few moments and trying again.  
    If this issue persists for an extended period of time, please report it to Opsera for further investigation.
  `;

  if (token) {
    axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }

  return axiosInstance;
}

export async function axiosApiGetCall(getAccessToken, cancelTokenSource, apiUrl, urlParams) {
  const accessToken = await getAccessToken();
  return await getAxiosInstance(accessToken, cancelTokenSource?.token).get(apiUrl, urlParams)
    .then((result) =>  {return result;})
    .catch(error => { if (!axios.isCancel(error)) {throw error;}});
}

export async function axiosApiPostCall(getAccessToken, cancelTokenSource, apiUrl, postBody) {
  const accessToken = await getAccessToken();
  return await getAxiosInstance(accessToken, cancelTokenSource?.token).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => { if (!axios.isCancel(error)) {throw error;}});
}

export async function axiosCustomTokenApiPostCall(customToken, cancelTokenSource, apiUrl, postBody) {
  return await getAxiosInstance(customToken, cancelTokenSource?.token).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => { if (!axios.isCancel(error)) {throw error;}});
}

export async function axiosTokenlessApiGetCall(cancelTokenSource, apiUrl, postBody) {
  return await getAxiosInstance(undefined, cancelTokenSource?.token).get(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => { if (!axios.isCancel(error)) {throw error;}});
}

export async function axiosApiPutCall(getAccessToken, cancelTokenSource, apiUrl, postBody) {
  const accessToken = await getAccessToken();
  return await getAxiosInstance(accessToken, cancelTokenSource?.token).put(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => { if (!axios.isCancel(error)) {throw error;}});
}

export async function axiosApiPatchCall(getAccessToken, cancelTokenSource, apiUrl, postBody) {
  const accessToken = await getAccessToken();
  return await getAxiosInstance(accessToken, cancelTokenSource?.token).patch(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => { if (!axios.isCancel(error)) {throw error;}});
}

export async function axiosApiDeleteCall(getAccessToken, cancelTokenSource, apiUrl) {
  const accessToken = await getAccessToken();
  return await getAxiosInstance(accessToken, cancelTokenSource?.token).delete(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => { if (!axios.isCancel(error)) {throw error;}});
}