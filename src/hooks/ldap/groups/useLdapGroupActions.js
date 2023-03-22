import useApiService from "hooks/api/service/useApiService";

export default function useLdapGroupActions() {
  const apiService = useApiService();
  const ldapGroupActions = {};

  ldapGroupActions.getResourcesWithGroupAssigned = async (
    group,
    type,
  ) => {
    const apiUrl = `/account/groups/assigned-roles/resources/`;
    const queryParameters = {
      group: group,
      type: type,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  ldapGroupActions.getLdapUserGroups = async () => {
    const apiUrl = `/account/groups`;
    return await apiService.handleApiGetRequest( apiUrl);
  };

  ldapGroupActions.getLdapUserGroupsWithDomain = async (
    domain,
  ) => {
    const apiUrl = `/users/account/${domain}/user-groups`;
    return await apiService.handleApiGetRequest( apiUrl);
  };

  return ldapGroupActions;
}