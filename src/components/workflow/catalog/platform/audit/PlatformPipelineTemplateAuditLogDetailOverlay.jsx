import React from 'react';
import PropTypes from 'prop-types';
import UserActivityAuditLogDetailOverlayBase from "components/common/audit_log/UserActivityAuditLogDetailOverlayBase";
import useGetPlatformPipelineTemplateAuditLogModelById
  from "hooks/audit_logs/pipelines/templates/platform/useGetPlatformPipelineTemplateAuditLogModelById";

export default function PlatformPipelineTemplateAuditLogDetailOverlay(
  {
    templateId,
    selectedAuditLogId,
    setSelectedAuditLogId,
  }) {
  const {
    platformPipelineTemplateAuditLogModel,
    isLoading,
    error,
  } = useGetPlatformPipelineTemplateAuditLogModelById(templateId, selectedAuditLogId);

  return (
    <UserActivityAuditLogDetailOverlayBase
      auditLogModel={platformPipelineTemplateAuditLogModel}
      isLoading={isLoading}
      setSelectedAuditLogId={setSelectedAuditLogId}
      type={"Platform Pipeline Template"}
    />
  );
}

PlatformPipelineTemplateAuditLogDetailOverlay.propTypes = {
  templateId: PropTypes.string,
  selectedAuditLogId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};