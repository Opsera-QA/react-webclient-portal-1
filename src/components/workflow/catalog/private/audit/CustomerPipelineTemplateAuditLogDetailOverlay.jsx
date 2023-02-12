import React from 'react';
import PropTypes from 'prop-types';
import UserActivityAuditLogDetailOverlayBase from "components/common/audit_log/UserActivityAuditLogDetailOverlayBase";
import useGetCustomerPipelineTemplateAuditLogModelById
  from "hooks/audit_logs/pipelines/templates/customer/useGetCustomerPipelineTemplateAuditLogModelById";

export default function CustomerPipelineTemplateAuditLogDetailOverlay(
  {
    templateId,
    selectedAuditLogId,
    setSelectedAuditLogId,
  }) {
  const {
    customerPipelineTemplateAuditLogModel,
    isLoading,
    error,
  } = useGetCustomerPipelineTemplateAuditLogModelById(templateId, selectedAuditLogId);

  return (
    <UserActivityAuditLogDetailOverlayBase
      auditLogModel={customerPipelineTemplateAuditLogModel}
      isLoading={isLoading}
      setSelectedAuditLogId={setSelectedAuditLogId}
      type={"Customer Pipeline Template"}
    />
  );
}

CustomerPipelineTemplateAuditLogDetailOverlay.propTypes = {
  templateId: PropTypes.string,
  selectedAuditLogId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};