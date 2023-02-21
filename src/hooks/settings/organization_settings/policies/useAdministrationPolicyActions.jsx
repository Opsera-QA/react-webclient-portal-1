import useApiService from "hooks/api/service/useApiService";

export default function useAdministrationPolicyActions() {
  const apiService = useApiService();
  const administrationPolicyActions = {};

  administrationPolicyActions.getPolicies = async () => {
    const apiUrl = `/administration/organization-settings/policies`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  administrationPolicyActions.getPolicyById = async (policyId) => {
    const apiUrl = `/administration/organization-settings/policies/${policyId}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  administrationPolicyActions.getPolicyByName = async (policyName) => {
    const apiUrl = `/administration/organization-settings/policies/name/${policyName}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  administrationPolicyActions.activatePolicy = async (policy) => {
    const apiUrl = `/administration/organization-settings/policies`;
    return await apiService.handleApiPostRequest(
      apiUrl,
      policy,
    );
  };

  administrationPolicyActions.updatePolicy = async (policyId, updatedPolicy) => {
    const apiUrl = `/administration/organization-settings/policies/${policyId}`;
    return await apiService.handleApiPutRequest(
      apiUrl,
      updatedPolicy,
    );
  };

  administrationPolicyActions.deletePolicy = async (policyId) => {
    const apiUrl = `/administration/organization-settings/policies/${policyId}`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  return administrationPolicyActions;
}
