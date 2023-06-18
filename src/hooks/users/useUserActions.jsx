import useApiService from "hooks/api/service/useApiService";
import routeTokenConstants from "@opsera/definitions/constants/routes/tokens/routeToken.constants";
import useApiTokenHandlerActions from "hooks/token/useApiTokenHandlerActions";

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

  return userActions;
}
