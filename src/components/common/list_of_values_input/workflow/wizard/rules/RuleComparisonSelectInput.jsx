import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const ruleOperands = [
  {value: "AND", text: "And"},
  {value: "OR", text: "Or"},
];

function RuleOperandSelectInput({fieldName, className, dataObject, setDataObject, disabled}) {
  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={ruleOperands}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

RuleOperandSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

RuleOperandSelectInput.defaultProps = {
  fieldName: "operand",
};

export default RuleOperandSelectInput;