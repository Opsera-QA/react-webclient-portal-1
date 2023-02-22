import useApiService from "hooks/api/service/useApiService";

export default function usePolicyAdministrationActions() {
  const apiService = useApiService();
  const policyAdministrationActions = {};

  policyAdministrationActions.getPolicies = async () => {
    const apiUrl = `/administration/organization-settings/policies`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  policyAdministrationActions.getPolicyById = async (
    policyId,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/policies/${organizationDomain}/${organizationAccountId}/${policyId}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  policyAdministrationActions.getPolicyByName = async (
    policyName,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/policies/name/${organizationDomain}/${organizationAccountId}/${policyName}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  policyAdministrationActions.activatePolicy = async (
    policy,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/policies/${organizationDomain}/${organizationAccountId}/`;
    return await apiService.handleApiPostRequest(
      apiUrl,
      policy,
    );
  };

  policyAdministrationActions.updatePolicy = async (
    policyId,
    updatedPolicy,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/policies/${organizationDomain}/${organizationAccountId}/${policyId}`;
    return await apiService.handleApiPutRequest(
      apiUrl,
      updatedPolicy,
    );
  };

  policyAdministrationActions.deletePolicy = async (
    policyId,
    organizationDomain,
    organizationAccountId,
  ) => {
    const apiUrl = `/administration/organization-settings/policies/${organizationDomain}/${organizationAccountId}/${policyId}`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  return policyAdministrationActions;
}
