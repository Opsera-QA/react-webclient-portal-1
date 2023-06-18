import useApiService from "hooks/api/service/useApiService";
import routeTokenConstants from "@opsera/definitions/constants/routes/tokens/routeToken.constants";
import useApiTokenHandlerActions from "hooks/token/useApiTokenHandlerActions";
import {stringHelper} from "components/common/helpers/string/string.helper";
import {generateUUID} from "components/common/helpers/string-helpers";
import {ApiService} from "api/apiService";

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

  userActions.getAccountInformationWithDomain = async (domain) => {
    const apiUrl = `/users/account/summary`;
    const token = await apiTokenHandlerActions.generateApiCallToken("orgRegistrationForm");

    const postBody = {
      domain: domain,
    };

    return await apiService.handleCustomTokenApiPostRequest(
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
    const token = await apiTokenHandlerActions.generateApiCallToken(routeTokenConstants.ROUTE_MIDDLEWARE_TOKEN_KEYS.CREATE_OPSERA_ACCOUNT);
    const apiUrl = "/users/create";

    return await apiService.handleCustomTokenApiPostRequest(
      token,
      apiUrl,
      finalObject,
    );
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
    const token = await apiTokenHandlerActions.generateApiCallToken(routeTokenConstants.ROUTE_MIDDLEWARE_TOKEN_KEYS.CREATE_OPSERA_ACCOUNT);

    return await apiService.handleCustomTokenApiPostRequest(
      token,
      apiUrl,
      finalObject,
    );
  };

  return userActions;
}
