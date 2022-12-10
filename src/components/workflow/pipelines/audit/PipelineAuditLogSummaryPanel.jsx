import React from 'react';
import PropTypes from 'prop-types';
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import UserActivityAuditLogSummaryPanelBase from "components/common/audit_log/UserActivityAuditLogSummaryPanelBase";
import useGetPipelineAuditLogModelById from "hooks/workflow/pipelines/audit/useGetPipelineAuditLogModelById";

export default function PipelineAuditLogSummaryPanel(
  {
    pipelineId,
    auditLogId,
  }) {
  const {
    pipelineAuditLogModel,
    isLoading,
    error,
  } = useGetPipelineAuditLogModelById(pipelineId, auditLogId);

  if (isLoading === true) {
    return (
      <CenterLoadingIndicator type={"Pipeline Audit Log"} />
    );
  }

  return (
    <UserActivityAuditLogSummaryPanelBase
      auditLogModel={pipelineAuditLogModel}
    />
  );
}

PipelineAuditLogSummaryPanel.propTypes = {
  pipelineId: PropTypes.string,
  auditLogId: PropTypes.string
};