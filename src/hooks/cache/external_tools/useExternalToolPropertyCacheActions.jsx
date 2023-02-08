import useApiService from "hooks/api/service/useApiService";

export default function useExternalToolPropertyCacheActions() {
  const apiService = useApiService();
  const externalToolPropertyCacheActions = {};

  externalToolPropertyCacheActions.getExternalToolPropertyCacheEntry = async (
    toolId,
    toolIdentifier,
    uniqueId,
  ) => {
    const apiUrl = `/cache/external-tools`;
    const queryParameters = {
      tool_id: toolId,
      tool_identifier: toolIdentifier,
      unique_id: uniqueId,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  externalToolPropertyCacheActions.createExternalToolPropertyCacheEntry = async (
    toolId,
    toolIdentifier,
    uniqueId,
    parameters,
  ) => {
    const apiUrl = `/cache/external-tools`;
    const postBody = {
      tool_id: toolId,
      tool_identifier: toolIdentifier,
      unique_id: uniqueId,
      parameters: parameters,
    };

    return await apiService.handleApiPostRequest(
      apiUrl,
      postBody,
    );
  };

  externalToolPropertyCacheActions.updateExternalToolPropertyCacheEntry = async (
    toolId,
    toolIdentifier,
    uniqueId,
    parameters,
  ) => {
    const apiUrl = `/cache/external-tools`;
    const postBody = {
      tool_id: toolId,
      tool_identifier: toolIdentifier,
      unique_id: uniqueId,
      parameters: parameters,
    };

    return await apiService.handleApiPatchRequest(
      apiUrl,
      postBody,
    );
  };

  return externalToolPropertyCacheActions;
}
