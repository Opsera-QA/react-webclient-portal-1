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

// TODO: Figure out best way to approach this
userActions.isEmailAvailable = async (emailAddress, getAccessToken) => {
  console.log("checking if email exists: " + emailAddress);
  let postBody = {
    email: emailAddress
  }
  const accessToken = await getAccessToken();
  const apiUrl = `/users/check-email`;
  const response = await axiosApiService(accessToken).post()(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

export default userActions;