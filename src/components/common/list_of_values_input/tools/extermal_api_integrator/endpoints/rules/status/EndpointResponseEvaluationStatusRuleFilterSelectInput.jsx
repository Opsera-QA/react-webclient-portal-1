import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const SUPPORTED_RULE_FILTER_TYPES = [
  {
    text: "Is Equal To",
    value: "equals",
  },
  {
    text: "Is Not Equal To",
    value: "not_equals",
  },
];

function EndpointResponseEvaluationStatusRuleFilterSelectInput(
  {
    model,
    setModel,
    fieldName,
    setDataFunction,
    disabled,
    className,
  }) {
  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={SUPPORTED_RULE_FILTER_TYPES}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      setDataFunction={setDataFunction}
    />
  );
}

EndpointResponseEvaluationStatusRuleFilterSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};


export default EndpointResponseEvaluationStatusRuleFilterSelectInput;