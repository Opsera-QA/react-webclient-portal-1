import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const SUPPORTED_FIELD_EVALUATION_FILTERS = [
  {
    text: "This Rule will be successful if any of the field evaluation rules listed below are met",
    value: "any",
  },
  {
    text: "This Rule will be successful if all of the field evaluation rules listed below are met",
    value: "all",
  },
  {
    text: "This Rule will be successful if none of the field evaluation rules listed below are met",
    value: "none",
  },
];

function EndpointResponseFieldEvaluationRulesFilterSelectInput(
  {
    model,
    setModel,
    fieldName,
    setDataFunction,
    disabled,
    className,
    showLabel,
  }) {
  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={SUPPORTED_FIELD_EVALUATION_FILTERS}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      showLabel={showLabel}
      setDataFunction={setDataFunction}
    />
  );
}

EndpointResponseFieldEvaluationRulesFilterSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
};

export default EndpointResponseFieldEvaluationRulesFilterSelectInput;