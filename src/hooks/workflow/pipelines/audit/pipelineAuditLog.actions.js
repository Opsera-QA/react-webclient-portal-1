import baseActions from "utils/actionsBase";

export const pipelineAuditLogActions = {};

pipelineAuditLogActions.getAuditLogsForPipeline = async (
  getAccessToken,
  cancelTokenSource,
  pipelineId,
) => {
  const apiUrl = `/audit-logs/pipelines/${pipelineId}`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
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
