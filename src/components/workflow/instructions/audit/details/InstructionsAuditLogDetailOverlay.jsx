import React from 'react';
import PropTypes from 'prop-types';
import useGetInstructionsAuditLogModelById from "hooks/audit_logs/instructions/useGetInstructionsAuditLogModelById";
import UserActivityAuditLogDetailOverlayBase from "components/common/audit_log/UserActivityAuditLogDetailOverlayBase";

export default function InstructionsAuditLogDetailOverlay(
  {
    instructionsId,
    selectedAuditLogId,
    setSelectedAuditLogId,
  }) {
  const {
    instructionsAuditLogModel,
    isLoading,
    error,
  } = useGetInstructionsAuditLogModelById(instructionsId, selectedAuditLogId);

  return (
    <UserActivityAuditLogDetailOverlayBase
      auditLogModel={instructionsAuditLogModel}
      isLoading={isLoading}
      setSelectedAuditLogId={setSelectedAuditLogId}
      type={"Instructions"}
    />
  );
}

InstructionsAuditLogDetailOverlay.propTypes = {
  instructionsId: PropTypes.string,
  selectedAuditLogId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};