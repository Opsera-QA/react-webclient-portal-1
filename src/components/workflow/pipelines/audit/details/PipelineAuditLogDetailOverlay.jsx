import React from 'react';
import PropTypes from 'prop-types';
import useGetPipelineAuditLogModelById from "hooks/audit_logs/pipelines/useGetPipelineAuditLogModelById";
import UserActivityAuditLogDetailOverlayBase from "components/common/audit_log/UserActivityAuditLogDetailOverlayBase";

export default function PipelineAuditLogDetailOverlay(
  {
    pipelineId,
    selectedAuditLogId,
    setSelectedAuditLogId,
  }) {
  const {
    pipelineAuditLogModel,
    isLoading,
    error,
  } = useGetPipelineAuditLogModelById(pipelineId, selectedAuditLogId);

  return (
    <UserActivityAuditLogDetailOverlayBase
      auditLogModel={pipelineAuditLogModel}
      isLoading={isLoading}
      setSelectedAuditLogId={setSelectedAuditLogId}
      type={"Pipeline"}
    />
  );
}

PipelineAuditLogDetailOverlay.propTypes = {
  pipelineId: PropTypes.string,
  selectedAuditLogId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};