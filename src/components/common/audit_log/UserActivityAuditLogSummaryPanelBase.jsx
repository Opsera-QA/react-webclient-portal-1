import React from 'react';
import PropTypes from 'prop-types';

export default function UserActivityAuditLogSummaryPanelBase(
  {
    auditLogModel,
    className,
  }) {

  if (auditLogModel == null) {
    return null;
  }

  return (
    <div className={className}>
      {JSON.stringify(auditLogModel)}
    </div>
  );
}

UserActivityAuditLogSummaryPanelBase.propTypes = {
  auditLogModel: PropTypes.object,
  className: PropTypes.string,
};