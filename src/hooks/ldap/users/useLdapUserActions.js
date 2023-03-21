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

  return ldapUserActions;
}