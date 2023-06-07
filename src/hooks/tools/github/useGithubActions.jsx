import useApiService from "hooks/api/service/useApiService";

export default function useGithubActions() {
  const apiService = useApiService();
  const githubActions = {};

  githubActions.getGithubRepositories = async (toolId, searchTerm, pageSize = 100, currentPage,) => {
    const apiUrl = `/tools/${toolId}/github/repositories/v2`;
    const queryParameters = {
      searchTerm: searchTerm,
      pageSize: pageSize,
      currentPage: currentPage,
    };

    return await apiService.handleApiGetRequest(apiUrl, queryParameters);
  };

  githubActions.getRepo = async (
    getAccessToken,
    cancelTokenSource,
    toolId,
    repositoryId,
  ) => {
    const apiUrl = `/tools/${toolId}/github/repository`;
  
    const queryParameters = {    
      repositoryId: repositoryId,
    };
  
    return await apiService.handleApiGetRequest(apiUrl, queryParameters);
  };
  

  return githubActions;
}
