import useApiService from "hooks/api/service/useApiService";

export default function useLdapUserActions() {
  const apiService = useApiService();
  const ldapUserActions = {};

  ldapUserActions.getLdapUsersWithDomain = async (
    domain,
  ) => {
    const apiUrl = `/account/users/${domain}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  ldapUserActions.getLdapUsers = async () => {
    const apiUrl = "/account/users";
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  ldapUserActions.getResourcesWithUserAssigned = async (
    userEmail,
    type,
  ) => {
    const apiUrl = `/account/users/assigned-roles/resources/`;
    const queryParameters = {
      userEmail: userEmail,
      type: type,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  return ldapUserActions;
}