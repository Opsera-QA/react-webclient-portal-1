import useApiService from "hooks/api/service/useApiService";

export default function usePlatformPipelineTemplateAuditLogActions() {
  const apiService = useApiService();
  const platformPipelineTemplateAuditLogActions = {};

  platformPipelineTemplateAuditLogActions.getAuditLogsForPlatformPipelineTemplate = async (
    templateId,
    userId,
    actions,
    siteRoles,
    dateRange,
  ) => {
    const apiUrl = `/audit-logs/pipelines/templates/platform/${templateId}`;
    const queryParameters = {
      actions: actions,
      siteRoles: siteRoles,
      userId: userId,
      dateRange: dateRange,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  platformPipelineTemplateAuditLogActions.getPlatformPipelineTemplateAuditLogById = async (
    templateId,
    auditLogId,
  ) => {
    const apiUrl = `/audit-logs/pipelines/templates/platform/${templateId}/log/${auditLogId}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  return platformPipelineTemplateAuditLogActions;
}
