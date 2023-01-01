import {useEffect, useState} from "react";
import useGetUserActivityAuditLogModel from "hooks/audit_logs/useGetUserActivityAuditLogModel";
import useGetPlatformPipelineTemplateAuditLogById
  from "hooks/audit_logs/pipelines/templates/platform/useGetPlatformPipelineTemplateAuditLogById";

export default function useGetPlatformPipelineTemplateAuditLogModelById(
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
  } = useGetPlatformPipelineTemplateAuditLogById(templateId, auditLogId,  handleErrorFunction);
  const {getUserActivityAuditLogModel} = useGetUserActivityAuditLogModel();
  const [platformPipelineTemplateAuditLogModel, setPlatformPipelineTemplateAuditLogModel] = useState(undefined);

  useEffect(() => {
    setPlatformPipelineTemplateAuditLogModel(undefined);

    if (auditLog) {
      setPlatformPipelineTemplateAuditLogModel(getUserActivityAuditLogModel(auditLog));
    }
  }, [auditLog]);

  return ({
    platformPipelineTemplateAuditLogModel: platformPipelineTemplateAuditLogModel,
    setPlatformPipelineTemplateAuditLogModel: setPlatformPipelineTemplateAuditLogModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
