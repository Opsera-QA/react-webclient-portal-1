import {ApiService, axiosApiService} from "../../api/apiService";
//import toolsActions from "../inventory/tools/tools-actions";
import baseActions from "../../utils/actionsBase";

// TODO: Rename with whatever name makes sense
const userActions = {};

// TODO: Remove after upgrading to V2 (IN Analytics Settings Actions)
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
  const apiCall = new ApiService("/users/check-email", {}, null, { "email": emailAddress, "hostname": window.location.hostname });
  return await apiCall
    .post()
    .then(function (response) {
      if (response.data?.emailExists === true) {
        return false; //cannot create new account beacuse this account is already enabled
      } else {
        return true;
      }
    })
    .catch(function (error) {
      console.error(error);
      return true;
    });
};

//Check if the domain is already registered in the system
userActions.isDomainAvailable = async (domain) => {
  console.log("checking if domain is registered to an account: " + domain);

  // TODO: Are there more opsera-specific subdomains?
  if (domain === "portal" || domain === "test" || domain === "dev" || domain === "freetrial") {
    return false;
  }

  const apiCall = new ApiService(`/users/check-domain/${domain}`, {}, null);

  console.log(`Api call domain: /users/check-domain/${domain}`);
  return await apiCall
    .get()
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
  let attributes = {
    title: registrationDataDto.getData("title"),
    company: registrationDataDto.getData("company"),
  };
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

userActions.createAwsMarketplaceOpseraAccount = async (registrationModel) => {
  const apiUrl = "/users/create";
  let finalObject = {...registrationModel.getPersistData()};

  const configuration = {
    cloudProvider: registrationModel.getData("cloudProvider"),
    cloudProviderRegion: registrationModel.getData("cloudProviderRegion")
  };

  const attributes = {
    title: registrationModel.getData("title"),
    company: registrationModel.getData("company"),
    aws_customer_id: registrationModel.getData("aws_customer_id"),
    aws_product_code: registrationModel.getData("aws_product_code"),
  };

  delete finalObject["cloudProviderRegion"];
  delete finalObject["cloudProvider"];
  delete finalObject["aws_customer_id"];
  delete finalObject["aws_product_code"];

  finalObject["configuration"] = configuration;
  finalObject["attributes"] = attributes;

  const apiCall = new ApiService(apiUrl, {}, null, finalObject);
  return await apiCall.post()
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
};



userActions.logout = async (getAccessToken) => {
  const postBody = {};
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


userActions.syncUser = async (getAccessToken, cancelTokenSource) => {
  let urlParams = {
    params: {
      sync: true
    }
  };
  const apiUrl = `/users`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

userActions.getAwsRegionsV2 = async (cancelTokenSource) => {
  const apiUrl = `/users/aws/regions`;
  return await baseActions.apiTokenlessGetCallV2(cancelTokenSource, apiUrl);
};

userActions.getAccountInformationWithEmailAddress = async (emailAddress, token) => {
  const apiUrl = `/users/account/summary`;

  const postBody = {
    email: emailAddress,
  };

  return await baseActions.customTokenApiPostCall(token, apiUrl, postBody);
};

userActions.getAccountInformationWithDomain = async (domain, token) => {
  const apiUrl = `/users/account/summary`;

  const postBody = {
    domain: domain,
  };

  return await baseActions.customTokenApiPostCall(token, apiUrl, postBody);
};

userActions.getAccountInformationV2 = async (cancelTokenSource, domain, token) => {
  const apiUrl = `/users/account/summary`;
  const postBody = { domain: domain };
  return await baseActions.customTokenApiPostCallV2(cancelTokenSource, token, apiUrl, postBody);
};

userActions.getUserNameAndEmailForIdV2 = async (
  getAccessToken,
  cancelTokenSource,
  userId,
) => {
  const apiUrl = `/users/${userId}/name`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

export default userActions;