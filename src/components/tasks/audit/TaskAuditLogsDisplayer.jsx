import React from 'react';
import PropTypes from 'prop-types';
import useGetAuditLogsForTask from "hooks/audit_logs/tasks/useGetAuditLogsForTask";
import IndividualObjectAuditLogsDisplayer from "components/common/audit_log/IndividualObjectAuditLogsDisplayer";

export default function TaskAuditLogsDisplayer(
  {
    taskId,
    setSelectedAuditLogId,
  }) {
  const {
    taskAuditLogFilterModel,
    setTaskAuditLogFilterModel,
    task,
    auditLogs,
    isLoading,
    loadData,
  } = useGetAuditLogsForTask(taskId);

  return (
    <IndividualObjectAuditLogsDisplayer
      loadData={loadData}
      auditLogs={auditLogs}
      auditLogFilterModel={taskAuditLogFilterModel}
      setAuditLogFilterModel={setTaskAuditLogFilterModel}
      isLoading={isLoading}
      setSelectedAuditLogId={setSelectedAuditLogId}
      titleText={task?.name || "Task"}
    />
  );
}

TaskAuditLogsDisplayer.propTypes = {
  taskId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};