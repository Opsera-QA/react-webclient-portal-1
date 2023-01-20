import React from 'react';
import PropTypes from 'prop-types';
import useGetAuditLogsForPipeline from "hooks/audit_logs/pipelines/useGetAuditLogsForPipeline";
import IndividualObjectAuditLogsDisplayer from "components/common/audit_log/IndividualObjectAuditLogsDisplayer";

export default function PipelineAuditLogsDisplayer(
  {
    pipelineId,
    setSelectedAuditLogId,
  }) {
  const {
    pipelineAuditLogFilterModel,
    setPipelineAuditLogFilterModel,
    pipeline,
    auditLogs,
    isLoading,
    loadData,
  } = useGetAuditLogsForPipeline(pipelineId);

  return (
    <IndividualObjectAuditLogsDisplayer
      loadData={loadData}
      auditLogs={auditLogs}
      auditLogFilterModel={pipelineAuditLogFilterModel}
      setAuditLogFilterModel={setPipelineAuditLogFilterModel}
      isLoading={isLoading}
      setSelectedAuditLogId={setSelectedAuditLogId}
      titleText={pipeline?.name || "Pipeline"}
    />
  );
}

PipelineAuditLogsDisplayer.propTypes = {
  pipelineId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};