import useApiService from "hooks/api/service/useApiService";

export default function useLdapOrganizationAccountActions() {
  const apiService = useApiService();
  const ldapOrganizationAccountActions = {};

  ldapOrganizationAccountActions.getOrganizationSettingsForOrganizationAccount = async (
    organizationDomain,
    organizationAccountName,
  ) => {
    const apiUrl = `/ldap/organization-account/organization-settings/${organizationDomain}/${organizationAccountName}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  return ldapOrganizationAccountActions;
}