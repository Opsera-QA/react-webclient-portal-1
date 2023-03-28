import useApiService from "hooks/api/service/useApiService";

export default function useLdapSiteRoleActions() {
  const apiService = useApiService();
  const ldapSiteRoleActions = {};

  ldapSiteRoleActions.getLdapSiteRolesWithDomain = async (
    domain,
  ) => {
    const apiUrl = `/account/site-roles/${domain}`;
    return await apiService.handleApiGetRequest( apiUrl);
  };

  ldapSiteRoleActions.getLdapUserSiteRoleByNameWithDomain = async (
    domain,
    groupName,
  ) => {
    const apiUrl = `/account/site-roles/${domain}/name/${groupName}`;
    return await apiService.handleApiGetRequest( apiUrl);
  };

  return ldapSiteRoleActions;
}