import React from "react";
import PropTypes from "prop-types";
import MultiSelectCheckboxInputBase from "components/common/inputs/boolean/checkbox/MultiSelectCheckboxInputBase";

export default function AuditLogActionsMutiSelectCheckboxInput(
  { 
    model,
    setModel,
    type, // TODO: Pass this in, wire up the function directly from the constants when ready
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
      checkboxOptions={model?.getActionSelectOptionsForType()}
      setModel={setModel}
      className={className}
      visible={visible}
      singularTopic={"Action"}
      pluralTopic={"Actions"}
    />
  );
}

AuditLogActionsMutiSelectCheckboxInput.propTypes = {
  model: PropTypes.object,
  type: PropTypes.string,
  setDataFunction: PropTypes.func,
  setModel: PropTypes.func,
  className: PropTypes.string,
  visible: PropTypes.bool,
  fieldName: PropTypes.string,
};


