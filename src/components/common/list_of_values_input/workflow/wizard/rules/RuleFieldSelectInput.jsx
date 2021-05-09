import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const ruleFields = [
  {value: "id", text: "ID"},
  {value: "name", text: "Name"},
  {value: "commitTime", text: "Commit Time"},
  {value: "committedBy", text: "Committed By"},
];

function RuleFieldSelectInput({fieldName, className, dataObject, setDataObject, disabled}) {
  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={ruleFields}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

RuleFieldSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

RuleFieldSelectInput.defaultProps = {
  fieldName: "field",
};

export default RuleFieldSelectInput;