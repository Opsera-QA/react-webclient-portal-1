import baseActions from "utils/actionsBase";
import {axiosApiService} from "api/apiService";

const analyticsActions = {};

// TODO: Remove when all references updated to V2
analyticsActions.fetchProfile = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/analytics/profile/settings";
  const response = await axiosApiService(accessToken)
    .get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

analyticsActions.getAnalyticsSettingsV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/analytics/settings`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

analyticsActions.getAnalyticsToolsV2 = async (getAccessToken, cancelTokenSource) => {
  // TODO: Pass in, if necessary
  const INDICES = [
    "jenkins",
    "opsera-pipeline",
    "jira",
    "sonar",
    "xunit",
    "junit",
    "jmeter",
    "heartbeat",
    "codeship",
    "gitlab",
    "metricbeat",
    "cypress",
    "anchore"
  ];

  const urlParams = {
    index: INDICES
  };

  const apiUrl = `/analytics/index`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

analyticsActions.fetchProfileV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/analytics/profile/settings";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

analyticsActions.createProfile = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/analytics/profile/create";
  const response = await axiosApiService(accessToken)
    .post(apiUrl, {})
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

analyticsActions.updateProfile = async (getAccessToken, postBody) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/analytics/update";
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

export default analyticsActions;
