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

  return platformUsersActions;
}
