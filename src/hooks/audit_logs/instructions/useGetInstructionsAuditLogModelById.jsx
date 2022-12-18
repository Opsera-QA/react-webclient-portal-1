import {useEffect, useState} from "react";
import useGetInstructionsAuditLogById from "hooks/audit_logs/instructions/useGetInstructionsAuditLogById";
import useGetUserActivityAuditLogModel from "hooks/audit_logs/useGetUserActivityAuditLogModel";

export default function useGetInstructionsAuditLogModelById(
  instructionsId,
  auditLogId,
  handleErrorFunction,
) {
  const {
    auditLog,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetInstructionsAuditLogById(instructionsId, auditLogId,  handleErrorFunction);
  const {getUserActivityAuditLogModel} = useGetUserActivityAuditLogModel();
  const [instructionsAuditLogModel, setInstructionsAuditLogModel] = useState(undefined);

  useEffect(() => {
    setInstructionsAuditLogModel(undefined);

    if (auditLog) {
      setInstructionsAuditLogModel(getUserActivityAuditLogModel(auditLog));
    }
  }, [auditLog]);

  return ({
    instructionsAuditLogModel: instructionsAuditLogModel,
    setInstructionsAuditLogModel: setInstructionsAuditLogModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
