import { axiosApiService } from "../../../../../../../../api/apiService";

const SpinnakerStepActions = {};

SpinnakerStepActions.searchApps = async (id, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/tools/properties";
  const postBody = {
    tool : "spinnaker",
    metric : "applications",
    id: id
  };
  const res = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return res;
};

SpinnakerStepActions.searchTools = async (spinnakerId, appName, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/tools/properties";
  const postBody = {
    tool : "spinnaker",
    metric : "tools",
    id: spinnakerId,
    appname: appName
  };
  const res = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return res;
  };

export default SpinnakerStepActions;
