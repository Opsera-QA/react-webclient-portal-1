import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const ruleComponentRanges = [
  {value: "all", text: "All"},
  {value: "one", text: "One"},
  {value: "many", text: "Multiple"},
];

function RuleComponentSelectInput({fieldName, className, dataObject, setDataObject, disabled}) {
  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={ruleComponentRanges}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

RuleComponentSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

RuleComponentSelectInput.defaultProps = {
  fieldName: "componentRange",
};

export default RuleComponentSelectInput;