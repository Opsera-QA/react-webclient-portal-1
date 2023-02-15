import React from "react";
import PropTypes from "prop-types";
import MultiSelectCheckboxInputBase from "components/common/inputs/boolean/checkbox/MultiSelectCheckboxInputBase";
import auditLogActionConstants from "@opsera/definitions/constants/audit-logs/actions/auditLogAction.constants";

export default function AuditLogActionsMultiSelectCheckboxInput(
  { 
    model,
    setModel,
    type,
    setDataFunction,
    className,
    visible,
    fieldName,
  }) {
  return (
    <MultiSelectCheckboxInputBase
      model={model}
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      checkboxOptions={auditLogActionConstants.getActionSelectOptionsForType(type)}
      setModel={setModel}
      className={className}
      visible={visible}
      singularTopic={"Action"}
      pluralTopic={"Actions"}
    />
  );
}

AuditLogActionsMultiSelectCheckboxInput.propTypes = {
  model: PropTypes.object,
  type: PropTypes.string,
  setDataFunction: PropTypes.func,
  setModel: PropTypes.func,
  className: PropTypes.string,
  visible: PropTypes.bool,
  fieldName: PropTypes.string,
};


