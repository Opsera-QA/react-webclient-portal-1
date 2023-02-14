import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {
  AUDIT_LOG_NOTIFICATION_METHOD_SELECT_OPTIONS
} from "components/common/list_of_values_input/notifications/method/audit_logs/auditLogNotificationMethod.constants";

export default function AuditLogNotificationMethodSelectInputBase(
  {
    fieldName,
    model,
    setModel,
    disabled,
    setDataFunction,
  }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={AUDIT_LOG_NOTIFICATION_METHOD_SELECT_OPTIONS}
      setDataFunction={setDataFunction}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

AuditLogNotificationMethodSelectInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

AuditLogNotificationMethodSelectInputBase.defaultProps = {
  fieldName: "method"
};
