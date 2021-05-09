import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const ruleTypes = [
  {value: "include", text: "Include"},
  {value: "exclude", text: "Exclude"},
];

function RuleTypeSelectInput({fieldName, className, dataObject, setDataObject, disabled}) {
  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={ruleTypes}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

RuleTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

RuleTypeSelectInput.defaultProps = {
  fieldName: "type",
};

export default RuleTypeSelectInput;