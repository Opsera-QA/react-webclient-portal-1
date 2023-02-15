import React from "react";
import PropTypes from "prop-types";
import AuditLogActionsMultiSelectCheckboxInput
  from "components/common/audit_log/inputs/AuditLogActionsMultiSelectCheckboxInput";

export default function InlineAuditLogActionsMultiSelectCheckboxFilter(
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
    model.setData(fieldName, newValues);
    loadDataFunction({...model});
  };

  return (
    <AuditLogActionsMultiSelectCheckboxInput
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

InlineAuditLogActionsMultiSelectCheckboxFilter.propTypes = {
  model: PropTypes.object,
  type: PropTypes.string,
  loadDataFunction: PropTypes.func,
  setModel: PropTypes.func,
  className: PropTypes.string,
  visible: PropTypes.bool,
  fieldName: PropTypes.string,
};


