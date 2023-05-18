import { parseAxiosError } from "api/apiServiceV2";

const axios = require("axios");
const config = require("../config");

export const nodeDataMigrationFileApiService = {};

nodeDataMigrationFileApiService.handleNodeDataMigrationFileApiGetCall = async (getAccessToken, cancelTokenSource, apiUrl, urlParams) => {
  const accessToken = await getAccessToken();

  try {
    return await getNodeDataMigrationFileAxiosInstance(accessToken, cancelTokenSource?.token).get(apiUrl, urlParams);
  }
  catch (error) {
    const parsedError = parseAxiosError(error);

    if (parsedError) {
      throw parsedError;
    }
  }
};

nodeDataMigrationFileApiService.handleNodeDataMigrationFileApiPostCall = async (getAccessToken, cancelTokenSource, apiUrl, postBody) => {
  const accessToken = await getAccessToken();

  try {
    return await getNodeDataMigrationFileAxiosInstance(accessToken, cancelTokenSource?.token).post(apiUrl, postBody);
  }
  catch (error) {
    const parsedError = parseAxiosError(error);

    if (parsedError) {
      throw parsedError;
    }
  }
};

nodeDataMigrationFileApiService.handleNodeDataMigrationFileApiPutCall = async (getAccessToken, cancelTokenSource, apiUrl, postBody) => {
  const accessToken = await getAccessToken();

  try {
    return await getNodeDataMigrationFileAxiosInstance(accessToken, cancelTokenSource?.token).put(apiUrl, postBody);
  }
  catch (error) {
    const parsedError = parseAxiosError(error);

    if (parsedError) {
      throw parsedError;
    }
  }
};

nodeDataMigrationFileApiService.handleNodeDataMigrationFileApiPatchCall = async (getAccessToken, cancelTokenSource, apiUrl, postBody) => {
  const accessToken = await getAccessToken();

  try {
    return await getNodeDataMigrationFileAxiosInstance(accessToken, cancelTokenSource?.token).patch(apiUrl, postBody);
  }
  catch (error) {
    const parsedError = parseAxiosError(error);

    if (parsedError) {
      throw parsedError;
    }
  }
};

nodeDataMigrationFileApiService.handleNodeDataMigrationFileDeleteRequest = async (getAccessToken, cancelTokenSource, apiUrl) => {
  const accessToken = await getAccessToken();


  try {
    return await getNodeDataMigrationFileAxiosInstance(accessToken, cancelTokenSource?.token).delete(apiUrl);
  }
  catch (error) {
    const parsedError = parseAxiosError(error);

    if (parsedError) {
      throw parsedError;
    }
  }
};

export const getNodeDataMigrationFileAxiosInstance = (token, cancelToken, customHeaders = undefined) => {
  const axiosConfig = {
    baseURL: config.NODE_DATA_MIGRATION_FILE_API_SERVER_URL,
    timeout: 200000, // tweak this to accommodate large files on slow networks
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
  if (customHeaders) {
    axios.defaults.headers.post['Content-Type'] = customHeaders.contentType;
  }

  return axiosInstance;
};