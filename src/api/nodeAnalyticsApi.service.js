const axios = require("axios");
const config = require("../config");

export const nodeAnalyticsApiService = {};

nodeAnalyticsApiService.handleNodeAnalyticsApiGetCall = async (getAccessToken, cancelTokenSource, apiUrl, urlParams) => {
  const accessToken = await getAccessToken();

  try {
    return await getNodeAnalyticsAxiosInstance(accessToken, cancelTokenSource?.token).get(apiUrl, urlParams);
  }
  catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
};

nodeAnalyticsApiService.handleNodeAnalyticsApiPostCall = async (getAccessToken, cancelTokenSource, apiUrl, postBody) => {
  const accessToken = await getAccessToken();

  try {
    return await getNodeAnalyticsAxiosInstance(accessToken, cancelTokenSource?.token).post(apiUrl, postBody);
  }
  catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
};

nodeAnalyticsApiService.handleNodeAnalyticsApiPutCall = async (getAccessToken, cancelTokenSource, apiUrl, postBody) => {
  const accessToken = await getAccessToken();

  try {
    return await getNodeAnalyticsAxiosInstance(accessToken, cancelTokenSource?.token).put(apiUrl, postBody);
  }
  catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
};

nodeAnalyticsApiService.handleNodeAnalyticsApiPatchCall = async (getAccessToken, cancelTokenSource, apiUrl, postBody) => {
  const accessToken = await getAccessToken();

  try {
    return await getNodeAnalyticsAxiosInstance(accessToken, cancelTokenSource?.token).patch(apiUrl, postBody);
  }
  catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
};

nodeAnalyticsApiService.handleNodeAnalyticsApiDeleteRequest = async (getAccessToken, cancelTokenSource, apiUrl) => {
  const accessToken = await getAccessToken();


  try {
    return await getNodeAnalyticsAxiosInstance(accessToken, cancelTokenSource?.token).delete(apiUrl);
  }
  catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
};

const getNodeAnalyticsAxiosInstance = (token, cancelToken) => {
  const axiosConfig = {
    baseURL: config.NODE_ANALYTICS_API_SERVER_URL,
    timeout: 50000,
    cancelToken: cancelToken
  };

  const axiosInstance = axios.create(axiosConfig);

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