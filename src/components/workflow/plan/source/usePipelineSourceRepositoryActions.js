import useApiService from "hooks/api/service/useApiService";

export default function usePipelineSourceRepositoryActions() {
  const apiService = useApiService();
  const pipelineSourceRepositoryActions = {};

  pipelineSourceRepositoryActions.updatePipelineSourceRepository = async (
    pipelineId,
    sourceRepositoryConfiguration,
  ) => {
    const apiUrl = `/workflow/source/${pipelineId}`;
    return await apiService.handleApiPostRequest(
      apiUrl,
      sourceRepositoryConfiguration,
    );
  };

  return pipelineSourceRepositoryActions;
}
