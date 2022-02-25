import {axiosApiService} from "api/apiService";
import {
  axiosApiDeleteCall,
  axiosApiGetCall,
  axiosApiPatchCall,
  axiosApiPostCall,
  axiosApiPutCall, axiosCustomTokenApiPostCall, axiosTokenlessApiGetCall
} from "api/apiServiceV2";
import {nodeAnalyticsApiService} from "api/nodeAnalyticsApi.service";

const baseActions = {};

baseActions.apiGetCall = async (getAccessToken, apiUrl, urlParams) => {
  const accessToken = await getAccessToken();
  return axiosApiService(accessToken).get(apiUrl, urlParams)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};

baseActions.apiGetCallV2 = async (getAccessToken, sourceToken, apiUrl, urlParams) => {
  return await axiosApiGetCall(getAccessToken, sourceToken, apiUrl, urlParams);
};

baseActions.apiTokenlessGetCallV2 = async (sourceToken, apiUrl, urlParams) => {
  return await axiosTokenlessApiGetCall(sourceToken, apiUrl, urlParams);
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
  return await axiosCustomTokenApiPostCall(customToken, cancelTokenSource, apiUrl, postBody);
};

baseActions.apiPostCall = async (getAccessToken, apiUrl, postBody = {}) => {
  const accessToken = await getAccessToken();
  return axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};

baseActions.apiPostCallV2 = async (getAccessToken, sourceToken, apiUrl, postBody = {}) => {
  return await axiosApiPostCall(getAccessToken, sourceToken, apiUrl, postBody);
};

baseActions.apiPutCall = async (getAccessToken, apiUrl, postBody = {}) => {
  const accessToken = await getAccessToken();
  return axiosApiService(accessToken).put(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};

// TODO: Wire up and test
baseActions.apiPutCallV2 = async (getAccessToken, sourceToken, apiUrl, postBody = {}) => {
  return await axiosApiPutCall(getAccessToken, sourceToken, apiUrl, postBody);
};

// TODO: Wire up and test
baseActions.apiPatchCallV2 = async (getAccessToken, sourceToken, apiUrl, postBody = {}) => {
  return await axiosApiPatchCall(getAccessToken, sourceToken, apiUrl, postBody);
};

baseActions.apiDeleteCall = async (getAccessToken, apiUrl) => {
  const accessToken = await getAccessToken();
  return axiosApiService(accessToken).delete(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};

// TODO: Wire up and test
baseActions.apiDeleteCallV2 = async (getAccessToken, sourceToken, apiUrl) => {
  return await axiosApiDeleteCall(getAccessToken, sourceToken, apiUrl);
};

baseActions.handleNodeAnalyticsApiPostRequest = async (getAccessToken, sourceToken, apiUrl, postBody = {}) => {
  return await nodeAnalyticsApiService.handleNodeAnalyticsApiPostCall(getAccessToken, sourceToken, apiUrl, postBody);
};

export default baseActions;