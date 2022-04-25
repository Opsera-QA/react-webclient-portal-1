import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const RULE_FILTER_TYPE_OPTIONS = [
  {value: "equals", text: "Equals"},
  {value: "startsWith", text: "Starts With"},
  {value: "endsWith", text: "Ends With"},
  {value: "contains", text: "Contains"},
];

function RuleFilterTypeSelectInput(
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
      setDataFunction={setDataFunction}
      selectOptions={RULE_FILTER_TYPE_OPTIONS}
      placeholderText={"Select a Filter"}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      showLabel={showLabel}
    />
  );
}

RuleFilterTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  showLabel: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

export default RuleFilterTypeSelectInput;