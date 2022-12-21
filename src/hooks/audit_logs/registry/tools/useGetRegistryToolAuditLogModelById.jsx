import {useEffect, useState} from "react";
import useGetUserActivityAuditLogModel from "hooks/audit_logs/useGetUserActivityAuditLogModel";
import useGetRegistryToolAuditLogById from "hooks/audit_logs/registry/tools/useGetRegistryToolAuditLogById";

export default function useGetRegistryToolAuditLogModelById(
  toolId,
  auditLogId,
  handleErrorFunction,
) {
  const {
    auditLog,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetRegistryToolAuditLogById(toolId, auditLogId,  handleErrorFunction);
  const {getUserActivityAuditLogModel} = useGetUserActivityAuditLogModel();
  const [toolAuditLogModel, setToolAuditLogModel] = useState(undefined);

  useEffect(() => {
    setToolAuditLogModel(undefined);

    if (auditLog) {
      setToolAuditLogModel(getUserActivityAuditLogModel(auditLog));
    }
  }, [auditLog]);

  return ({
    toolAuditLogModel: toolAuditLogModel,
    setToolAuditLogModel: setToolAuditLogModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
