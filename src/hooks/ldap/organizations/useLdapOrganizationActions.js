import useApiService from "hooks/api/service/useApiService";

export default function useLdapOrganizationActions() {
  const apiService = useApiService();
  const ldapOrganizationActions = {};

  ldapOrganizationActions.getLdapOrganizations = async () => {
    const apiUrl = "/users/account/organizations";
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  return ldapOrganizationActions;
}