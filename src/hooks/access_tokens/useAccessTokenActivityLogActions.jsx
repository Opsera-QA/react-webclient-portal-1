import useApiService from "hooks/api/service/useApiService";

export default function useAccessTokenActivityLogActions() {
  const apiService = useApiService();
  const accessTokenActivityLogActions = {};

  accessTokenActivityLogActions.getUserAccessTokenActivityLogs = async (
    userId,
    toolIdentifier,
    uniqueId,
  ) => {
    const apiUrl = `/account/access-tokens/${userId}`;
    const queryParameters = {
      tool_identifier: toolIdentifier,
      unique_id: uniqueId,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  return accessTokenActivityLogActions;
}
