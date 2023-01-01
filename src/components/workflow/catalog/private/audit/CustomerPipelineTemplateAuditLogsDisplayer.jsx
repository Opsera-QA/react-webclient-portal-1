import React from 'react';
import PropTypes from 'prop-types';
import IndividualObjectAuditLogsDisplayer from "components/common/audit_log/IndividualObjectAuditLogsDisplayer";
import useGetAuditLogsForCustomerPipelineTemplate
  from "hooks/audit_logs/pipelines/templates/customer/useGetAuditLogsForCustomerPipelineTemplate";

export default function CustomerPipelineTemplateAuditLogsDisplayer(
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
  } = useGetAuditLogsForCustomerPipelineTemplate(templateId);

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

CustomerPipelineTemplateAuditLogsDisplayer.propTypes = {
  templateId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};