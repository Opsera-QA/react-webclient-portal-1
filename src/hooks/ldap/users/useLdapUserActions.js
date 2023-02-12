import useApiService from "hooks/api/service/useApiService";

export default function useLdapUserActions() {
  const apiService = useApiService();
  const ldapUserActions = {};

  ldapUserActions.getLdapUsersWithDomainV2 = async (
    domain,
  ) => {
    const apiUrl = "/users/account/users";
    const postBody = {
      domain: domain
    };

    return await apiService.handleApiPostRequest(
      apiUrl,
      postBody,
    );
  };

  return ldapUserActions;
}