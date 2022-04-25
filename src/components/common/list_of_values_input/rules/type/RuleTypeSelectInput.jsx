import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const ruleTypes = [
  {value: "include", text: "Include"},
  {value: "exclude", text: "Exclude"},
];

function RuleTypeSelectInput(
  {
    fieldName,
    className,
    model,
    setModel,
    disabled,
    showLabel,
    setDataFunction,
  }) {
  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={ruleTypes}
      valueField={"value"}
      textField={"text"}
      placeholderText={"Select a Rule Type"}
      setDataFunction={setDataFunction}
      disabled={disabled}
      showLabel={showLabel}
    />
  );
}

RuleTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

RuleTypeSelectInput.defaultProps = {
  fieldName: "type",
};

export default RuleTypeSelectInput;