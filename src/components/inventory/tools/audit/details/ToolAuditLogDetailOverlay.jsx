import React from 'react';
import PropTypes from 'prop-types';
import UserActivityAuditLogDetailOverlayBase from "components/common/audit_log/UserActivityAuditLogDetailOverlayBase";
import useGetRegistryToolAuditLogModelById from "hooks/audit_logs/registry/tools/useGetRegistryToolAuditLogModelById";

export default function ToolAuditLogDetailOverlay(
  {
    toolId,
    selectedAuditLogId,
    setSelectedAuditLogId,
  }) {
  const {
    toolAuditLogModel,
    isLoading,
    error,
  } = useGetRegistryToolAuditLogModelById(toolId, selectedAuditLogId);

  return (
    <UserActivityAuditLogDetailOverlayBase
      auditLogModel={toolAuditLogModel}
      isLoading={isLoading}
      setSelectedAuditLogId={setSelectedAuditLogId}
      type={"Tool"}
    />
  );
}

ToolAuditLogDetailOverlay.propTypes = {
  toolId: PropTypes.string,
  selectedAuditLogId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};