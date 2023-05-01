import useApiService from "hooks/api/service/useApiService";

export default function useEntitlementAdministrationActions() {
  const apiService = useApiService();
  const entitlementAdministrationActions = {};

  entitlementAdministrationActions.getentitlements = async () => {
    const apiUrl = `/administration/organization-settings/entitlements`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  entitlementAdministrationActions.getEntitlementById = async (
    entitlementId,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/entitlements/${organizationDomain}/${organizationAccountId}/${entitlementId}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  entitlementAdministrationActions.getEntitlementByName = async (
    entitlementName,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/entitlements/name/${organizationDomain}/${organizationAccountId}/${entitlementName}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  entitlementAdministrationActions.activateEntitlement = async (
    entitlement,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/entitlements/${organizationDomain}/${organizationAccountId}/`;
    return await apiService.handleApiPostRequest(
      apiUrl,
      entitlement,
    );
  };

  entitlementAdministrationActions.updateEntitlement = async (
    entitlementId,
    updatedEntitlement,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/entitlements/${organizationDomain}/${organizationAccountId}/${entitlementId}`;
    return await apiService.handleApiPutRequest(
      apiUrl,
      updatedEntitlement,
    );
  };

  entitlementAdministrationActions.deleteEntitlement = async (
    entitlementId,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/entitlements/${organizationDomain}/${organizationAccountId}/${entitlementId}`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  return entitlementAdministrationActions;
}
