import baseActions from "utils/actionsBase";

export const taskAuditLogActions = {};

taskAuditLogActions.getAuditLogsForTask = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  userId,
  action,
) => {
  const apiUrl = `/audit-logs/tasks/${taskId}`;
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

taskAuditLogActions.getTaskAuditLogById = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  auditLogId,
) => {
  const apiUrl = `/audit-logs/tasks/${taskId}/log/${auditLogId}`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};
