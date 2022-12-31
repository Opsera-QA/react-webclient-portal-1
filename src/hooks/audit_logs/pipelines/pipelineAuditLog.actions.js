import baseActions from "utils/actionsBase";

export const pipelineAuditLogActions = {};

pipelineAuditLogActions.getAuditLogsForPipeline = async (
  getAccessToken,
  cancelTokenSource,
  pipelineId,
  userId,
  actions,
  siteRoles,
  dateRange,
) => {
  const apiUrl = `/audit-logs/pipelines/${pipelineId}`;
  const queryParameters = {
    actions: actions,
    siteRoles: siteRoles,
    userId: userId,
    dateRange: dateRange,
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
