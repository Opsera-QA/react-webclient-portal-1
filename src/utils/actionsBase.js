import {axiosApiService} from "api/apiService";
import {nodeAnalyticsApiService} from "api/nodeAnalyticsApi.service";
import {apiServiceV2} from "api/apiServiceV2";

const baseActions = {};

baseActions.apiGetCall = async (getAccessToken, apiUrl, urlParams) => {
  const accessToken = await getAccessToken();
  return axiosApiService(accessToken).get(apiUrl, urlParams)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};

baseActions.apiGetCallV2 = async (getAccessToken, sourceToken, apiUrl, urlParams) => {
  return await apiServiceV2.axiosApiGetCall(getAccessToken, sourceToken, apiUrl, urlParams);
};

baseActions.apiTokenlessGetCallV2 = async (sourceToken, apiUrl, urlParams) => {
  return await apiServiceV2.axiosTokenlessApiGetCall(sourceToken, apiUrl, urlParams);
};

baseActions.customTokenApiGetCall = async (customToken, apiUrl, urlParams) => {
  return axiosApiService(customToken).get(apiUrl, urlParams)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};

baseActions.customTokenApiPostCall = async (customToken, apiUrl, postBody) => {
  return axiosApiService(customToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};

baseActions.customTokenApiPostCallV2 = async (cancelTokenSource, customToken, apiUrl, postBody) => {
  return await apiServiceV2.axiosCustomTokenApiPostCall(customToken, cancelTokenSource, apiUrl, postBody);
};

baseActions.apiPostCall = async (getAccessToken, apiUrl, postBody = {}) => {
  const accessToken = await getAccessToken();
  return axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};

baseActions.apiPostCallV2 = async (getAccessToken, sourceToken, apiUrl, postBody = {}) => {
  return await apiServiceV2.axiosApiPostCall(getAccessToken, sourceToken, apiUrl, postBody);
};

baseActions.apiPutCall = async (getAccessToken, apiUrl, postBody = {}) => {
  const accessToken = await getAccessToken();
  return axiosApiService(accessToken).put(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};

baseActions.apiPutCallV2 = async (getAccessToken, sourceToken, apiUrl, postBody = {}) => {
  return await apiServiceV2.axiosApiPutCall(getAccessToken, sourceToken, apiUrl, postBody);
};

baseActions.apiPatchCallV2 = async (getAccessToken, sourceToken, apiUrl, postBody = {}) => {
  return await apiServiceV2.axiosApiPatchCall(getAccessToken, sourceToken, apiUrl, postBody);
};

baseActions.apiDeleteCall = async (getAccessToken, apiUrl) => {
  const accessToken = await getAccessToken();
  return axiosApiService(accessToken).delete(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};

// TODO: Wire up and test
baseActions.apiDeleteCallV2 = async (getAccessToken, sourceToken, apiUrl) => {
  return await apiServiceV2.axiosApiDeleteCall(getAccessToken, sourceToken, apiUrl);
};

baseActions.handleNodeAnalyticsApiPostRequest = async (getAccessToken, sourceToken, apiUrl, postBody = {}) => {
  return await nodeAnalyticsApiService.handleNodeAnalyticsApiPostCall(getAccessToken, sourceToken, apiUrl, postBody);
};

baseActions.handleNodeAnalyticsApiGetRequest = async (getAccessToken, sourceToken, apiUrl, urlParams = {}) => {
  return await nodeAnalyticsApiService.handleNodeAnalyticsApiGetCall(getAccessToken, sourceToken, apiUrl, urlParams);
};

export default baseActions;