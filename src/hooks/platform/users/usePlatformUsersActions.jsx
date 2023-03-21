import useApiService from "hooks/api/service/useApiService";

export default function usePlatformUsersActions() {
  const apiService = useApiService();
  const platformUsersActions = {};

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

  return platformUsersActions;
}
