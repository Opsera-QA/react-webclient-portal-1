import React from "react";
import PropTypes from "prop-types";
import AuditLogNotificationMethodSelectInputBase
  from "components/common/list_of_values_input/notifications/method/audit_logs/AuditLogNotificationMethodSelectInputBase";
import {hasStringValue} from "components/common/helpers/string-helpers";
import auditLogTypeConstants from "@opsera/definitions/constants/audit-logs/types/auditLogType.constants";

export default function AuditLogNotificationTargetMultiSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const objectType = model?.getData("method");

  if (objectType === auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.TASK) {
    return null;
  }

  if (objectType === auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.TOOL_REGISTRY) {
    return null;
  }

  if (objectType === auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.PIPELINE) {
    return null;
  }

  return null;
}

AuditLogNotificationTargetMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

AuditLogNotificationTargetMultiSelectInput.defaultProps = {
  fieldName: "target"
};
