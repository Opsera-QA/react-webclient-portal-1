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

  ldapUserActions.removeUserFromAssignedRules = async (
    userEmail,
  ) => {
    const apiUrl = `/account/users/${userEmail}/assigned-roles`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  ldapUserActions.revokeUserGroupMembership = async (
    userEmail,
  ) => {
    const apiUrl = `/account/users/${userEmail}/group-membership`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  ldapUserActions.revokeSiteRoleMembership = async (
    userEmail,
  ) => {
    const apiUrl = `/account/users/${userEmail}/site-role-membership`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  ldapUserActions.revokeUserAccessTokens = async (
    userId,
  ) => {
    const apiUrl = `/account/users/${userId}/access-tokens`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  return ldapUserActions;
}