import baseActions from "utils/actionsBase";

export const pipelineOrchestrationActions = {};

pipelineOrchestrationActions.getPipelineOrchestrationStatus = async (
  getAccessToken,
  cancelTokenSource,
  pipelineId,
) => {
  const apiUrl = `/workflow/orchestration/status/${pipelineId}`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};
