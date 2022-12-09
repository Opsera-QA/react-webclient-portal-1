import baseActions from "utils/actionsBase";

export const pipelineAuditLogActions = {};

pipelineAuditLogActions.getAuditLogsForPipeline = async (
  getAccessToken,
  cancelTokenSource,
  pipelineId,
  userId,
  action,
) => {
  const apiUrl = `/audit-logs/pipelines/${pipelineId}`;
  const queryParameters = {
    action: action,
    userId: userId,
  };

  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    queryParameters,
  );
};

pipelineAuditLogActions.getPipelineAuditLogById = async (
  getAccessToken,
  cancelTokenSource,
  pipelineId,
  auditLogId,
) => {
  const apiUrl = `/audit-logs/pipelines/${pipelineId}/log/${auditLogId}`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};
