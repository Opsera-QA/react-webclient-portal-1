import { ApiService, axiosApiService } from "../../api/apiService";
import baseActions from "../../utils/actionsBase";
import { stringHelper } from "components/common/helpers/string/string.helper";
import { generateUUID } from "components/common/helpers/string-helpers";
import { apiTokenHelper } from "temp-library-components/helpers/api/token/apiToken.helper";
import routeTokenConstants from "@opsera/definitions/constants/routes/tokens/routeToken.constants";

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
userActions.isEmailAvailable = async (cancelTokenSource, emailAddress) => {
  const token = apiTokenHelper.generateApiCallToken(routeTokenConstants.ROUTE_MIDDLEWARE_TOKEN_KEYS.DOES_EMAIL_EXIST);
  const apiUrl = "/users/check-email";
  const postBody = {
    email: emailAddress,
    hostname: window.location.hostname,
  };

  return await baseActions.customTokenApiPostCallV2(
    cancelTokenSource,
    token,
    apiUrl,
    postBody,
  );
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
userActions.createFreeTrialAccount = async (cancelTokenSource, registrationModel) => {
  const finalObject = registrationModel?.getPersistData();
  const company = finalObject?.company;
  const attributes = {
    title: finalObject?.title,
    company: company,
  };
  const configuration = {
    cloudProvider: "GKE",
    cloudProviderRegion: "",
  };
  finalObject.company = undefined;
  finalObject.title = undefined;
  finalObject.attributes = attributes;
  finalObject.configuration = configuration;
  finalObject.organizationName = `${stringHelper.replaceSpacesWithUnderscores(company)}-${finalObject?.email}-${generateUUID()}`;
  const token = apiTokenHelper.generateApiCallToken(routeTokenConstants.ROUTE_MIDDLEWARE_TOKEN_KEYS.CREATE_OPSERA_ACCOUNT);
  const apiUrl = "/users/create";

  return await baseActions.customTokenApiPostCallV2(
    cancelTokenSource,
    token,
    apiUrl,
    finalObject,
  );
};

// TODO: Update as needed, create multi level input items to prevent having to deconstruct them
userActions.createOpseraAccount = async (cancelTokenSource, registrationDataDto) => {
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
  const token = apiTokenHelper.generateApiCallToken(routeTokenConstants.ROUTE_MIDDLEWARE_TOKEN_KEYS.CREATE_OPSERA_ACCOUNT);
  const apiUrl = "/users/create";

  return await baseActions.customTokenApiPostCallV2(
    cancelTokenSource,
    token,
    apiUrl,
    finalObject,
  );
};

userActions.getLoggedInUser = async (
  token,
  cancelTokenSource,
  expectedEmailAddress,
  ) => {
  const apiUrl = "/users";
  const queryParameters = {
    emailAddress: expectedEmailAddress,
  };

  return await baseActions.customTokenApiGetCallV2(
    token,
    cancelTokenSource,
    apiUrl,
    queryParameters,
  );
};

userActions.createAwsMarketplaceOpseraAccount = async (cancelTokenSource, registrationModel) => {
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
  const token = apiTokenHelper.generateApiCallToken(routeTokenConstants.ROUTE_MIDDLEWARE_TOKEN_KEYS.CREATE_OPSERA_ACCOUNT);

  return await baseActions.customTokenApiPostCallV2(
    cancelTokenSource,
    token,
    apiUrl,
    finalObject,
  );
};

userActions.getUserWithAuthenticationStateToken = async (
  cancelTokenSource,
  token,
) => {
  const apiUrl = "/users";
  return await baseActions.customTokenApiGetCall(token, apiUrl);
};


/***
 * Calls the Opsera logout route which expires the User object cache in Redis
 * @param getAccessToken
 * @returns {Promise<AxiosResponse<any>>}
 */
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


/***
 * Calls an explicit Okta Revoke Access Token command to invalidate the current bearer token
 * @param getAccessToken
 * @returns {Promise<AxiosResponse<any>>}
 */
userActions.revokeAuthToken = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/token/okta/revoke";

  const response = await axiosApiService(accessToken).put(apiUrl, null, null)
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

// TODO: Remove once all instances are updated to awsActions.getAwsRegionsV2
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

userActions.getAccountInformationWithDomain = async (cancelTokenSource, domain) => {
  const apiUrl = `/users/account/summary`;
  const token = apiTokenHelper.generateApiCallToken("orgRegistrationForm");

  const postBody = {
    domain: domain,
  };

  return await baseActions.customTokenApiPostCallV2(cancelTokenSource, token, apiUrl, postBody);
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