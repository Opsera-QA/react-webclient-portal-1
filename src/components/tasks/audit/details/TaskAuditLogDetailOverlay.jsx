import React from 'react';
import PropTypes from 'prop-types';
import useGetTaskAuditLogModelById from "hooks/audit_logs/tasks/useGetTaskAuditLogModelById";
import UserActivityAuditLogDetailOverlayBase from "components/common/audit_log/UserActivityAuditLogDetailOverlayBase";

export default function TaskAuditLogDetailOverlay(
  {
    taskId,
    selectedAuditLogId,
    setSelectedAuditLogId,
  }) {
  const {
    taskAuditLogModel,
    isLoading,
    error,
  } = useGetTaskAuditLogModelById(taskId, selectedAuditLogId);

  return (
    <UserActivityAuditLogDetailOverlayBase
      auditLogModel={taskAuditLogModel}
      isLoading={isLoading}
      setSelectedAuditLogId={setSelectedAuditLogId}
      type={"Task"}
    />
  );
}

TaskAuditLogDetailOverlay.propTypes = {
  taskId: PropTypes.string,
  selectedAuditLogId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};