import {useEffect, useState} from "react";
import useGetPipelineAuditLogById from "hooks/audit_logs/pipelines/useGetPipelineAuditLogById";
import useGetUserActivityAuditLogModel from "hooks/audit_logs/useGetUserActivityAuditLogModel";

export default function useGetPipelineAuditLogModelById(
  pipelineId,
  auditLogId,
  handleErrorFunction,
) {
  const {
    auditLog,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetPipelineAuditLogById(pipelineId, auditLogId,  handleErrorFunction);
  const {getUserActivityAuditLogModel} = useGetUserActivityAuditLogModel();
  const [pipelineAuditLogModel, setPipelineAuditLogModel] = useState(undefined);

  useEffect(() => {
    setPipelineAuditLogModel(undefined);

    if (auditLog) {
      setPipelineAuditLogModel(getUserActivityAuditLogModel(auditLog));
    }
  }, [auditLog]);

  return ({
    pipelineAuditLogModel: pipelineAuditLogModel,
    setPipelineAuditLogModel: setPipelineAuditLogModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
