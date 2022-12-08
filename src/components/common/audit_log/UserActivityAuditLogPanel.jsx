import React from 'react';
import PropTypes from 'prop-types';
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";

export default function UserActivityAuditLogPanel(
  {
    auditLogId,
    setSelectedActivityLogId,
    className,
  }) {

  if (DataParsingHelper.isValidMongoDbId(auditLogId) !== true) {
    return null;
  }

  return (
    <div className={className}>
      {auditLogId}
      <BackButtonBase
        // isLoading={}
        backButtonFunction={() => setSelectedActivityLogId(undefined)}
      />
    </div>
  );
}

UserActivityAuditLogPanel.propTypes = {
  auditLogId: PropTypes.string,
  setSelectedActivityLogId: PropTypes.func,
  className: PropTypes.string,
};