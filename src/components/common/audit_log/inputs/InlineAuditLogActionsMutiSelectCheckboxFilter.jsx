import React from "react";
import PropTypes from "prop-types";
import AuditLogActionsMutiSelectCheckboxInput
  from "components/common/audit_log/inputs/AuditLogActionsMutiSelectCheckboxInput";

export default function InlineAuditLogActionsMutiSelectCheckboxFilter(
  { 
    model,
    setModel,
    loadDataFunction,
    className,
    visible,
    fieldName,
    type,
  }) {
  const setDataFunction = (fieldName, newValues) => {
    console.log("got new values: " + JSON.stringify(newValues));
    model.setData(fieldName, newValues);
    loadDataFunction({...model});
  };

  return (
    <AuditLogActionsMutiSelectCheckboxInput
      model={model}
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      setModel={setModel}
      className={className}
      visible={visible}
      type={type}
    />
  );
}

InlineAuditLogActionsMutiSelectCheckboxFilter.propTypes = {
  model: PropTypes.object,
  type: PropTypes.string,
  loadDataFunction: PropTypes.func,
  setModel: PropTypes.func,
  className: PropTypes.string,
  visible: PropTypes.bool,
  fieldName: PropTypes.string,
};


