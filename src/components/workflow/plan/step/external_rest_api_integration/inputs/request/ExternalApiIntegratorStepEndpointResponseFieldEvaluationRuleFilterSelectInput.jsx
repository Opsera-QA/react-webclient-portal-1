import React from "react";
import PropTypes from "prop-types";
import EndpointResponseFieldEvaluationRuleFilterSelectInput
  from "components/common/list_of_values_input/tools/extermal_api_integrator/endpoints/rules/field_evaluation/EndpointResponseFieldEvaluationRuleFilterSelectInput";
import {dataParsingHelper} from "components/common/helpers/data/dataParsing.helper";

function ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput(
  {
    model,
    setModel,
    fieldName,
    disabled,
    className,
    showLabel,
    isSensitiveData,
    updateMainModelFunction,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setData(fieldName, selectedOption?.value);
    newModel.setData("value", dataParsingHelper.parseObjectValue(model?.getData("type")));
    updateMainModelFunction(newModel);
  };

  return (
    <EndpointResponseFieldEvaluationRuleFilterSelectInput
      className={className}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      disabled={disabled}
      showLabel={showLabel}
      setDataFunction={setDataFunction}
      isSensitiveData={isSensitiveData}
    />
  );
}

ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  isSensitiveData: PropTypes.bool,
  updateMainModelFunction: PropTypes.func,
};

export default ExternalApiIntegratorStepEndpointResponseFieldEvaluationRuleFilterSelectInput;