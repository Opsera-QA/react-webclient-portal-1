import React from 'react';
import PropTypes from 'prop-types';
import useGetAuditLogsForTool from "hooks/audit_logs/registry/tools/useGetAuditLogsForTool";
import IndividualObjectAuditLogsDisplayer from "components/common/audit_log/IndividualObjectAuditLogsDisplayer";

export default function ToolAuditLogsDisplayer(
  {
    toolId,
    setSelectedAuditLogId,
  }) {
  const {
    toolAuditLogFilterModel,
    setToolAuditLogFilterModel,
    auditLogs,
    isLoading,
    loadData,
    tool,
  } = useGetAuditLogsForTool(toolId);

  return (
    <IndividualObjectAuditLogsDisplayer
      loadData={loadData}
      auditLogs={auditLogs}
      auditLogFilterModel={toolAuditLogFilterModel}
      setAuditLogFilterModel={setToolAuditLogFilterModel}
      isLoading={isLoading}
      setSelectedAuditLogId={setSelectedAuditLogId}
      titleText={tool?.name || "Tool"}
    />
  );
}

ToolAuditLogsDisplayer.propTypes = {
  toolId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};