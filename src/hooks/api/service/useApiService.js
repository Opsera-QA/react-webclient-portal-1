import { hasStringValue } from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import axios from "axios";

export const parseAxiosError = (error) => {
  if (!axios.isCancel(error)) {
    if (typeof error === "object" && hasStringValue(error?.message) === true) {
      switch (error?.message) {
        case "Network Error":
          return "Please check your network connectivity and try again.";
      }
    }


    return error;
  }
};

const axiosTimeoutErrorMessage = `
    Access timeout reached. A timeout like this can occur due to intermittent networking or connectivity issues.  
    Please try refreshing the page or waiting a few moments and trying again.  
    If this issue persists for an extended period of time, please report it to Opsera for further investigation.
`;

const getAxiosInstance = (token, cancelToken) => {
  const configuration = {
    baseURL: process.env.REACT_APP_OPSERA_API_SERVER_URL,
    timeout: 50000,
    cancelToken: cancelToken,
  };

  const axiosInstance = axios.create(configuration);

  axiosInstance.defaults.timeoutErrorMessage = axiosTimeoutErrorMessage;

  if (token) {
    axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }

  return axiosInstance;
};

export default function useApiService() {
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  const apiService = {};

  apiService.handleTokenlessApiGetRequest = async (apiUrl, postBody) => {
    try {
      return await getAxiosInstance(undefined, cancelTokenSource?.token).get(apiUrl, postBody);
    }
    catch (error) {
      const parsedError = parseAxiosError(error);

      if (parsedError) {
        throw parsedError;
      }
    }
  };

  apiService.handleApiGetRequest = async (apiUrl, urlParams) => {
    const accessToken = await getAccessToken();
    const parsedUrlParams = DataParsingHelper.parseObject(urlParams, {});

    try {
      return await getAxiosInstance(accessToken, cancelTokenSource?.token)
        .get(
          apiUrl,
          { params: parsedUrlParams, }
        );
    }
    catch (error) {
      const parsedError = parseAxiosError(error);

      if (parsedError) {
        throw parsedError;
      }
    }
  };

  apiService.handleCustomTokenApiGetRequest = async (customToken, apiUrl, urlParams) => {
    try {
      return await getAxiosInstance(
        customToken,
        cancelTokenSource?.token,
      ).get(
        apiUrl,
        {
          params: urlParams,
        },
      );
    } catch (error) {
      const parsedError = parseAxiosError(error);

      if (parsedError) {
        throw parsedError;
      }
    }
  };

  apiService.handleApiPostRequest = async (apiUrl, postBody) => {
    const accessToken = await getAccessToken();

    try {
      return await getAxiosInstance(accessToken, cancelTokenSource?.token).post(apiUrl, postBody);
    }
    catch (error) {
      const parsedError = parseAxiosError(error);

      if (parsedError) {
        throw parsedError;
      }
    }
  };

  apiService.handleCustomTokenApiPostRequest = async (customToken, apiUrl, postBody) => {
    try {
      return await getAxiosInstance(customToken, cancelTokenSource?.token).post(apiUrl, postBody);
    }
    catch (error) {
      const parsedError = parseAxiosError(error);

      if (parsedError) {
        throw parsedError;
      }
    }
  };

  apiService.handleApiPutRequest = async (apiUrl, postBody) => {
    const accessToken = await getAccessToken();

    try {
      return await getAxiosInstance(accessToken, cancelTokenSource?.token).put(apiUrl, postBody);
    }
    catch (error) {
      const parsedError = parseAxiosError(error);

      if (parsedError) {
        throw parsedError;
      }
    }
  };

  apiService.handleApiPatchRequest = async (apiUrl, postBody) => {
    const accessToken = await getAccessToken();

    try {
      return await getAxiosInstance(accessToken, cancelTokenSource?.token).patch(apiUrl, postBody);
    }
    catch (error) {
      const parsedError = parseAxiosError(error);

      if (parsedError) {
        throw parsedError;
      }
    }
  };

  apiService.handleApiDeleteRequest = async (apiUrl) => {
    const accessToken = await getAccessToken();

    try {
      return await getAxiosInstance(accessToken, cancelTokenSource?.token).delete(apiUrl);
    }
    catch (error) {
      const parsedError = parseAxiosError(error);

      if (parsedError) {
        throw parsedError;
      }
    }
  };

  return apiService;
}