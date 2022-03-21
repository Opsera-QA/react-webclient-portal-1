import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const SUPPORTED_RULE_OPTIONS = [
  {
    text: "Status Code",
    value: "status",
  },
  {
    text: "Response Field",
    value: "field",
  },
];

function EndpointResponseEvaluationRuleOptionSelectInput(
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
      selectOptions={SUPPORTED_RULE_OPTIONS}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      setDataFunction={setDataFunction}
    />
  );
}

EndpointResponseEvaluationRuleOptionSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointResponseEvaluationRuleOptionSelectInput;