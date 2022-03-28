import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const SUPPORTED_FIELD_EVALUATION_FILTERS = [
  {
    text: "Equals",
    value: "equals",
  },
  {
    text: "Does Not Equal",
    value: "not_equals",
  },
  {
    text: "Exists",
    value: "is_not_null",
  },
  {
    text: "Does Not Exist",
    value: "is_null",
  },
];

function EndpointResponseFieldEvaluationRuleFilterSelectInput(
  {
    model,
    setModel,
    fieldName,
    setDataFunction,
    disabled,
    className,
    showLabel,
    isSensitiveData,
  }) {
  const getSelectOptions = () => {
    if (isSensitiveData === true) {
      return (
        [
          {
            text: "Exists",
            value: "is_not_null",
          },
          {
            text: "Does Not Exist",
            value: "is_null",
          },
        ]
      );
    }

    return (
      SUPPORTED_FIELD_EVALUATION_FILTERS
    );
  };

  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={getSelectOptions()}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      showLabel={showLabel}
      setDataFunction={setDataFunction}
    />
  );
}

EndpointResponseFieldEvaluationRuleFilterSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  isSensitiveData: PropTypes.bool,
};

export default EndpointResponseFieldEvaluationRuleFilterSelectInput;