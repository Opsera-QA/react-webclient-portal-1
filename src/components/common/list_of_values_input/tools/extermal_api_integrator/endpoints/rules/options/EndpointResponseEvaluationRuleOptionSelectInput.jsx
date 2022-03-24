import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const SUPPORTED_RULE_OPTIONS = [
  {
    text: "Status Code",
    value: "status",
  },
  {
    text: "Response Field Evaluation",
    value: "field_evaluation",
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
    responseFields,
  }) {
  // TODO: Find better way to disable options
  const getOptions = () => {
    if (!Array.isArray(responseFields) || responseFields.length === 0) {
      return [{
        text: "Status Code",
        value: "status",
      },];
    }

    return SUPPORTED_RULE_OPTIONS;
  };

  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={getOptions()}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      setDataFunction={setDataFunction}
      // customInfoTextMessage={"Field Evaluation is only available if Response Fields are registered in the selected endpoint."}
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
  responseFields: PropTypes.array,
};

export default EndpointResponseEvaluationRuleOptionSelectInput;