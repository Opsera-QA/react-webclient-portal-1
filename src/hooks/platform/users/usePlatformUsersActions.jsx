import useApiService from "hooks/api/service/useApiService";

export default function usePlatformUsersActions() {
  const apiService = useApiService();
  const platformUsersActions = {};

  platformUsersActions.getLoggedInUser = async (expectedEmailAddress) => {
    const apiUrl = "/users";
    const queryParameters = {
      emailAddress: expectedEmailAddress,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  platformUsersActions.getOrganizationAccountOwnerSsoUsers = async () => {
    const apiUrl = `/users/organization-account-owners`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  platformUsersActions.getPendingUsers = async (
    organizationDomain,
    organizationAccount,
  ) => {
    const apiUrl = `/users/pending-users`;
    const queryParameters = {
      domain: organizationDomain,
      account: organizationAccount,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  platformUsersActions.getPlatformUsers = async () => {
    const apiUrl = `/users/platform`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  platformUsersActions.getUserById = async (id,) => {
    const apiUrl = `/users/user/${id}`;
    return await apiService.handleApiGetRequest(apiUrl,);
  };

  platformUsersActions.getRevokedUsers = async () => {
    const apiUrl = `/users/revoked`;
    return await apiService.handleApiGetRequest(apiUrl,);
  };

  platformUsersActions.getActiveUsers = async () => {
    const apiUrl = `/users/active`;
    return await apiService.handleApiGetRequest(apiUrl,);
  };

  platformUsersActions.revokeUserById = async (userId,) => {
    const apiUrl = `/users/${userId}/access/revoke`;
    return await apiService.handleApiPatchRequest(apiUrl,);
  };

  platformUsersActions.reinstateUserById = async (userId,) => {
    const apiUrl = `/users/${userId}/access/reinstate`;
    return await apiService.handleApiPatchRequest(apiUrl,);
  };

  platformUsersActions.deactivateUserById = async (userId,) => {
    const apiUrl = `/users/${userId}/deactivate`;
    return await apiService.handleApiDeleteRequest(apiUrl,);
  };

  return platformUsersActions;
}
