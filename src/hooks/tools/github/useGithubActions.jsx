import useApiService from "hooks/api/service/useApiService";
import baseActions from "utils/actionsBase";

export default function useGithubActions() {
  const apiService = useApiService();
  const githubActions = {};

  githubActions.getGithubRepositories = async (getAccessToken, sourceToken, toolId, searchTerm, pageSize = 100, currentPage,) => {
    const apiUrl = `/tools/${toolId}/github/repositories/v2`;
    const queryParameters = {
      searchTerm: searchTerm,
      pageSize: pageSize,
      currentPage: currentPage,
    };

    return await baseActions.apiGetCallV2(getAccessToken, sourceToken, apiUrl, queryParameters);
  };


  return githubActions;
}
