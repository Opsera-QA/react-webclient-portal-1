import {ApiService, axiosApiService} from "../../api/apiService";
import toolsActions from "../inventory/tools/tools-actions";

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

//Check if the email is already registered in the system
userActions.isEmailAvailable = async (emailAddress) => {
  console.log("checking if email exists: " + emailAddress);
  const apiCall = new ApiService("/users/check-email", {}, null, { email: emailAddress });
  return await apiCall
    .post()
    .then(function (response) {
      if (response.data) {
        return false;
      } else {
        return true;
      }
    })
    .catch(function (error) {
      return true;
    });
};

//Check if the domain is already registered in the system
userActions.isDomainAvailable = async (domain) => {
  const apiCall = new ApiService("/users/check-domain", {}, null, { domain: domain });
  return await apiCall
    .post()
    .then(function (response) {
      if (response.data) {
        return false;
      } else {
        return true;
      }
    })
    .catch(function (error) {
      return true;
    });
};


// TODO: Update as needed, create multi level input items to prevent having to deconstruct them
userActions.createFreeTrialAccount = async (registrationDataDto) => {
  let finalObject = registrationDataDto.getPersistData();
  let attributes = { title: registrationDataDto.getData("title"), company: registrationDataDto.getData("company") };
  let configuration = { cloudProvider: "GKE", cloudProviderRegion: "" };
  delete finalObject["title"];
  delete finalObject["company"];
  finalObject["attributes"] = attributes;
  finalObject["configuration"] = configuration;
  finalObject["domain"] = registrationDataDto.getData("domain");
  finalObject["organizationName"] = "freeTrial";

  const apiCall = new ApiService("/users/create", {}, null, finalObject);
  const response = await apiCall
    .post()
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

// TODO: Update as needed, create multi level input items to prevent having to deconstruct them
userActions.createOpseraAccount = async (registrationDataDto) => {
  let finalObject = {...registrationDataDto.getPersistData()};
  let configuration = {
    cloudProvider: registrationDataDto.getData("cloudProvider"),
    cloudProviderRegion: registrationDataDto.getData("cloudProviderRegion")
  };
  let attributes = {title: registrationDataDto.getData("title"), company: registrationDataDto.getData("company")};
  delete finalObject["cloudProviderRegion"];
  delete finalObject["cloudProvider"];
  finalObject["configuration"] = configuration;
  finalObject["attributes"] = attributes;

  const apiCall = new ApiService("/users/create", {}, null, finalObject);
  const response = await apiCall.post()
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};


userActions.logout = async (getAccessToken) => {
  const postBody = {}
  const accessToken = await getAccessToken();
  const apiUrl = "/users/logout";
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch(error => {
      throw error;
    });
  return response;
};


userActions.syncUser = async (getAccessToken) => {
  let urlParams = {
    params: {
      sync: true
    }
  }
  const accessToken = await getAccessToken();
  const apiUrl = `/users`;
  const response = await axiosApiService(accessToken).get(apiUrl, urlParams)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};


export default userActions;