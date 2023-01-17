import useApiService from "hooks/api/service/useApiService";

export default function usePolicyActions() {
  const apiService = useApiService();
  const policyActions = {};

  policyActions.getPolicies = async () => {
    const apiUrl = `/settings/organization-settings/policies`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  policyActions.getPolicyById = async (policyId) => {
    const apiUrl = `/settings/organization-settings/policies/${policyId}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  policyActions.getPolicyByName = async (policyName) => {
    const apiUrl = `/settings/organization-settings/policies/name/${policyName}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };


  policyActions.activatePolicy = async (policy) => {
    const apiUrl = `/settings/organization-settings/policies`;
    return await apiService.handleApiPostRequest(
      apiUrl,
      policy,
    );
  };

  policyActions.updatePolicy = async (policyId, updatedPolicy) => {
    const apiUrl = `/settings/organization-settings/policies/${policyId}`;
    return await apiService.handleApiPutRequest(
      apiUrl,
      updatedPolicy,
    );
  };

  policyActions.deletePolicy = async (policyId) => {
    const apiUrl = `/settings/organization-settings/policies/${policyId}`;
    return await apiService.handleApiDeleteRequest(
      apiUrl,
    );
  };

  return policyActions;
}
