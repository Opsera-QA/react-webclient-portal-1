import useApiService from "hooks/api/service/useApiService";

export default function useExternalApiIntegratorEndpointActions() {
  const apiService = useApiService();
  const externalApiIntegratorEndpointsActions = {};

  externalApiIntegratorEndpointsActions.getExternalApiIntegratorEndpoints = async (toolId) => {
    const apiUrl = `/tool/external-api-integrator/${toolId}/endpoints`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  externalApiIntegratorEndpointsActions.getExternalApiIntegratorEndpointById = async (toolId, endpointId) => {
    const apiUrl = `/tool/external-api-integrator/${toolId}/endpoints/${endpointId}`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  externalApiIntegratorEndpointsActions.createExternalApiIntegratorEndpoint = async (toolId, endpointModel) => {
    const apiUrl = `/tool/external-api-integrator/${toolId}/endpoints/create`;
    const postBody = {
      ...endpointModel?.getPersistData(),
    };

    return await apiService.handleApiPostRequest(apiUrl, postBody);
  };

  externalApiIntegratorEndpointsActions.updateExternalApiIntegratorEndpoint = async (toolId, endpointModel) => {
    const apiUrl = `/tool/external-api-integrator/${toolId}/endpoints/${endpointModel?.getMongoDbId()}/update`;
    const postBody = {
      ...endpointModel?.getPersistData(),
    };

    return await apiService.handleApiPutRequest(apiUrl, postBody);
  };

  externalApiIntegratorEndpointsActions.deleteExternalApiIntegratorEndpoint = async (toolId, endpointId) => {
    const apiUrl = `/tool/external-api-integrator/${toolId}/endpoints/${endpointId}`;
    return await apiService.handleApiDeleteRequest(apiUrl);
  };

  externalApiIntegratorEndpointsActions.testConnectionValidationEndpoint = async (toolId, endpointId) => {
    const apiUrl = `/tool/external-api-integrator/connection-check/${toolId}/endpoints/${endpointId}`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  return externalApiIntegratorEndpointsActions;
}
