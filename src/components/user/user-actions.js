import {axiosApiService} from "../../api/apiService";

// TODO: Rename with whatever name makes sense
const userActions = {};

userActions.getAnalyticsSettings = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/analytics/settings`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

export default userActions;