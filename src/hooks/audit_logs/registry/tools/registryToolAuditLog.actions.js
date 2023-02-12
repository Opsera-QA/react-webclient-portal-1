import baseActions from "utils/actionsBase";

export const registryToolAuditLogActions = {};

registryToolAuditLogActions.getAuditLogsForTool = async (
  getAccessToken,
  cancelTokenSource,
  toolId,
  userId,
  action,
) => {
  const apiUrl = `/audit-logs/tools/${toolId}`;
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

registryToolAuditLogActions.getToolAuditLogById = async (
  getAccessToken,
  cancelTokenSource,
  toolId,
  auditLogId,
) => {
  const apiUrl = `/audit-logs/tools/${toolId}/log/${auditLogId}`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};
