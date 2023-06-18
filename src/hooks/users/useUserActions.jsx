import useApiService from "hooks/api/service/useApiService";
import routeTokenConstants from "@opsera/definitions/constants/routes/tokens/routeToken.constants";
import useApiTokenHandlerActions from "hooks/token/useApiTokenHandlerActions";
import baseActions from "utils/actionsBase";
import {stringHelper} from "components/common/helpers/string/string.helper";
import {generateUUID} from "components/common/helpers/string-helpers";
import {apiTokenHelper} from "temp-library-components/helpers/api/token/apiToken.helper";

export default function useUserActions() {
  const apiService = useApiService();
  const apiTokenHandlerActions = useApiTokenHandlerActions();
  const userActions = {};

  userActions.isFreeTrialAccountActive = async (email) => {
    const token = await apiTokenHandlerActions.generateApiCallToken(routeTokenConstants.ROUTE_MIDDLEWARE_TOKEN_KEYS.IS_ACCOUNT_ACTIVE);
    const apiUrl = "/users/trial/is-account-active";
    const postBody = {
      email: email,
      hostname: window.location.hostname,
    };

    return await apiService.handleCustomTokenApiPostRequest(
      token,
      apiUrl,
      postBody,
    );
  };

  userActions.isEmailAvailable = async (emailAddress) => {
    const token = await apiTokenHandlerActions.generateApiCallToken(routeTokenConstants.ROUTE_MIDDLEWARE_TOKEN_KEYS.DOES_EMAIL_EXIST);
    const apiUrl = "/users/check-email";
    const postBody = {
      email: emailAddress,
      hostname: window.location.hostname,
    };

    return await apiService.handleCustomTokenApiPostRequest(
      token,
      apiUrl,
      postBody,
    );
  };

  userActions.createFreeTrialAccount = async (registrationModel) => {
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
    const token = await apiTokenHandlerActions.generateApiCallToken(routeTokenConstants.ROUTE_MIDDLEWARE_TOKEN_KEYS.CREATE_OPSERA_ACCOUNT);
    const apiUrl = "/users/create";

    return await apiService.handleCustomTokenApiPostRequest(
      token,
      apiUrl,
      finalObject,
    );
  };


  return userActions;
}
