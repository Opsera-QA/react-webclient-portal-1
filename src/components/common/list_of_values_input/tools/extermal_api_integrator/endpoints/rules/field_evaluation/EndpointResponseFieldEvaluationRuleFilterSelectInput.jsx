import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import apiResponseEvaluationOptionConstants
  from "@opsera/definitions/constants/api/response/apiResponseEvaluationOption.constants";

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
      return (apiResponseEvaluationOptionConstants.SUPPORTED_SENSITIVE_DATA_RESPONSE_EVALUATION_SELECT_OPTIONS);
    }

    return (apiResponseEvaluationOptionConstants.SUPPORTED_RESPONSE_EVALUATION_SELECT_OPTIONS);
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