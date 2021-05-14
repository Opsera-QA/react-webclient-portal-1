import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const ruleComponentRanges = [
  {value: "all", text: "All"},
  {value: "one", text: "One"},
  {value: "many", text: "Multiple"},
];

function RuleComponentRangeSelectInput({fieldName, className, dataObject, setDataObject, disabled, showLabel}) {
  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={ruleComponentRanges}
      placeholderText={"Select a Range"}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      showLabel={showLabel}
    />
  );
}

RuleComponentRangeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showLabel: PropTypes.bool
};

RuleComponentRangeSelectInput.defaultProps = {
  fieldName: "range",
};

export default RuleComponentRangeSelectInput;