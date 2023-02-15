import React from "react";
import PropTypes from "prop-types";
import AuditLogNotificationMethodSelectInputBase
  from "components/common/list_of_values_input/notifications/method/audit_logs/AuditLogNotificationMethodSelectInputBase";

export default function AuditLogNotificationMethodSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    model?.setData(fieldName, selectedOption?.value);
    model?.setDefaultValue("configuration");
    model?.setDefaultValue("target");
    setModel({...model});
  };

  return (
    <AuditLogNotificationMethodSelectInputBase
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

AuditLogNotificationMethodSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

AuditLogNotificationMethodSelectInput.defaultProps = {
  fieldName: "method"
};
