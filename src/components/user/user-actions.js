import { axiosApiService } from "../../api/apiService";
import baseActions from "../../utils/actionsBase";
import routeTokenConstants from "@opsera/definitions/constants/routes/tokens/routeToken.constants";

// TODO: Rename with whatever name makes sense
const userActions = {};

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