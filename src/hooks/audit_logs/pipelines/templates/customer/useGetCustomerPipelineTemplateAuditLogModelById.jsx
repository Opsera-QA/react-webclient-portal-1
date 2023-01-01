import {useEffect, useState} from "react";
import useGetUserActivityAuditLogModel from "hooks/audit_logs/useGetUserActivityAuditLogModel";
import useGetCustomerPipelineTemplateAuditLogById
  from "hooks/audit_logs/pipelines/templates/customer/useGetCustomerPipelineTemplateAuditLogById";

export default function useGetCustomerPipelineTemplateAuditLogModelById(
  templateId,
  auditLogId,
  handleErrorFunction,
) {
  const {
    auditLog,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetCustomerPipelineTemplateAuditLogById(templateId, auditLogId,  handleErrorFunction);
  const {getUserActivityAuditLogModel} = useGetUserActivityAuditLogModel();
  const [customerPipelineTemplateAuditLogModel, setCustomerPipelineTemplateAuditLogModel] = useState(undefined);

  useEffect(() => {
    setCustomerPipelineTemplateAuditLogModel(undefined);

    if (auditLog) {
      setCustomerPipelineTemplateAuditLogModel(getUserActivityAuditLogModel(auditLog));
    }
  }, [auditLog]);

  return ({
    customerPipelineTemplateAuditLogModel: customerPipelineTemplateAuditLogModel,
    setCustomerPipelineTemplateAuditLogModel: setCustomerPipelineTemplateAuditLogModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
