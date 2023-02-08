import useApiService from "hooks/api/service/useApiService";

export default function useToolIdentifierActions() {
  const apiService = useApiService();
  const toolIdentifierActions = {};

  toolIdentifierActions.getToolIdentifierByIdentifier = async (
    identifier,
  ) => {
    const apiUrl = `/tool/identifier/${identifier}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  return toolIdentifierActions;
}
