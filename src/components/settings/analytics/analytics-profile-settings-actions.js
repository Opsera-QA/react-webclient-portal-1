import { axiosApiService } from "../../../api/apiService";

const analyticsProfileActions = {};

analyticsProfileActions.fetchProfile = async (getAccessToken) => {
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

analyticsProfileActions.createProfile = async (getAccessToken) => {
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

analyticsProfileActions.updateProfile = async (getAccessToken, postBody) => {
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

export default analyticsProfileActions;
