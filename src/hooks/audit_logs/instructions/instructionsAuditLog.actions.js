import baseActions from "utils/actionsBase";

export const instructionsAuditLogActions = {};

instructionsAuditLogActions.getAuditLogsForInstructions = async (
  getAccessToken,
  cancelTokenSource,
  instructionsId,
  userId,
  action,
) => {
  const apiUrl = `/audit-logs/instructions/${instructionsId}`;
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

instructionsAuditLogActions.getInstructionsAuditLogById = async (
  getAccessToken,
  cancelTokenSource,
  instructionsId,
  auditLogId,
) => {
  const apiUrl = `/audit-logs/instructions/${instructionsId}/log/${auditLogId}`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};
