import React from 'react';
import PropTypes from 'prop-types';
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import UserActivityAuditLogSummaryPanelBase from "components/common/audit_log/UserActivityAuditLogSummaryPanelBase";
import useGetPipelineAuditLogById from "hooks/workflow/pipelines/audit/useGetPipelineAuditLogById";

export default function PipelineAuditLogSummaryPanel(
  {
    pipelineId,
    auditLogId,
  }) {
  const {
    auditLog,
    isLoading,
  } = useGetPipelineAuditLogById(pipelineId, auditLogId);

  if (isLoading === true) {
    return (
      <CenterLoadingIndicator type={"Pipeline Audit Log"} />
    );
  }

  return (
    <UserActivityAuditLogSummaryPanelBase
      auditLogModel={auditLog}
    />
  );
}

PipelineAuditLogSummaryPanel.propTypes = {
  pipelineId: PropTypes.string,
  auditLogId: PropTypes.string
};