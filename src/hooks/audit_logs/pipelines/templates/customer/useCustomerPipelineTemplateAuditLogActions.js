import useApiService from "hooks/api/service/useApiService";

export default function useCustomerPipelineTemplateAuditLogActions() {
  const apiService = useApiService();
  const customerPipelineTemplateAuditLogActions = {};

  customerPipelineTemplateAuditLogActions.getAuditLogsForCustomerPipelineTemplate = async (
    templateId,
    userId,
    actions,
    siteRoles,
    dateRange,
  ) => {
    const apiUrl = `/audit-logs/pipelines/templates/customer/${templateId}`;
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

  customerPipelineTemplateAuditLogActions.getCustomerPipelineTemplateAuditLogById = async (
    templateId,
    auditLogId,
  ) => {
    const apiUrl = `/audit-logs/pipelines/templates/customer/${templateId}/log/${auditLogId}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  return customerPipelineTemplateAuditLogActions;
}
