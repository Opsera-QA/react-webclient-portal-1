const axios = require("axios");
const config = require("../config");

export const apiServiceV2 = {};

apiServiceV2.axiosApiGetCall = async (getAccessToken, cancelTokenSource, apiUrl, urlParams) => {
  const accessToken = await getAccessToken();

  try {
    return await getAxiosInstance(accessToken, cancelTokenSource?.token).get(apiUrl, urlParams);
  }
  catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
};

apiServiceV2.axiosApiPostCall = async (getAccessToken, cancelTokenSource, apiUrl, postBody) => {
  const accessToken = await getAccessToken();

  try {
    return await getAxiosInstance(accessToken, cancelTokenSource?.token).post(apiUrl, postBody);
  }
  catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
};

apiServiceV2.axiosCustomTokenApiPostCall = async (customToken, cancelTokenSource, apiUrl, postBody) => {

  try {
    return await getAxiosInstance(customToken, cancelTokenSource?.token).post(apiUrl, postBody);
  }
  catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
};

apiServiceV2.axiosTokenlessApiGetCall = async (cancelTokenSource, apiUrl, postBody) => {

  try {
    return await getAxiosInstance(undefined, cancelTokenSource?.token).get(apiUrl, postBody);
  }
  catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
};

apiServiceV2.axiosApiPutCall = async (getAccessToken, cancelTokenSource, apiUrl, postBody) => {
  const accessToken = await getAccessToken();

  try {
    return await getAxiosInstance(accessToken, cancelTokenSource?.token).put(apiUrl, postBody);
  }
  catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
};

apiServiceV2.axiosApiPatchCall = async (getAccessToken, cancelTokenSource, apiUrl, postBody) => {
  const accessToken = await getAccessToken();

  try {
    return await getAxiosInstance(accessToken, cancelTokenSource?.token).patch(apiUrl, postBody);
  }
  catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
};

apiServiceV2.axiosApiDeleteCall = async (getAccessToken, cancelTokenSource, apiUrl) => {
  const accessToken = await getAccessToken();

  try {
    return await getAxiosInstance(accessToken, cancelTokenSource?.token).delete(apiUrl);
  }
  catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
};

const getAxiosInstance = (token, cancelToken) => {
  const configuration = {
    baseURL: config.apiServerUrl,
    timeout: 50000,
    cancelToken: cancelToken,
  };

  const axiosInstance = axios.create(configuration);

  axiosInstance.defaults.timeoutErrorMessage = `
    Access timeout reached. A timeout like this can occur due to intermittent networking or connectivity issues.  
    Please try refreshing the page or waiting a few moments and trying again.  
    If this issue persists for an extended period of time, please report it to Opsera for further investigation.
  `;

  if (token) {
    axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }

  return axiosInstance;
};