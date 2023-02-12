import React from 'react';
import PropTypes from 'prop-types';
import IndividualObjectAuditLogsDisplayer from "components/common/audit_log/IndividualObjectAuditLogsDisplayer";
import useGetAuditLogsForPlatformPipelineTemplate
  from "hooks/audit_logs/pipelines/templates/platform/useGetAuditLogsForPlatformPipelineTemplate";

export default function PlatformPipelineTemplateAuditLogsDisplayer(
  {
    templateId,
    setSelectedAuditLogId,
  }) {
  const {
    auditLogFilterModel,
    setAuditLogFilterModel,
    pipelineTemplate,
    auditLogs,
    isLoading,
    loadData,
  } = useGetAuditLogsForPlatformPipelineTemplate(templateId);

  return (
    <IndividualObjectAuditLogsDisplayer
      loadData={loadData}
      auditLogs={auditLogs}
      auditLogFilterModel={auditLogFilterModel}
      setAuditLogFilterModel={setAuditLogFilterModel}
      isLoading={isLoading}
      setSelectedAuditLogId={setSelectedAuditLogId}
      titleText={pipelineTemplate?.name || "Customer Pipeline Template"}
    />
  );
}

PlatformPipelineTemplateAuditLogsDisplayer.propTypes = {
  templateId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};