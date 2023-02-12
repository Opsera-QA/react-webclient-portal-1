import {useEffect, useState} from "react";
import useGetTaskAuditLogById from "hooks/audit_logs/tasks/useGetTaskAuditLogById";
import useGetUserActivityAuditLogModel from "hooks/audit_logs/useGetUserActivityAuditLogModel";

export default function useGetTaskAuditLogModelById(
  taskId,
  auditLogId,
  handleErrorFunction,
) {
  const {
    auditLog,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetTaskAuditLogById(taskId, auditLogId,  handleErrorFunction);
  const {getUserActivityAuditLogModel} = useGetUserActivityAuditLogModel();
  const [taskAuditLogModel, setTaskAuditLogModel] = useState(undefined);

  useEffect(() => {
    setTaskAuditLogModel(undefined);

    if (auditLog) {
      setTaskAuditLogModel(getUserActivityAuditLogModel(auditLog));
    }
  }, [auditLog]);

  return ({
    taskAuditLogModel: taskAuditLogModel,
    setTaskAuditLogModel: setTaskAuditLogModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
