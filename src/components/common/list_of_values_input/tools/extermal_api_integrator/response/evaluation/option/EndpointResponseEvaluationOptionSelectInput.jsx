import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import endpointResponseEvaluationOptionConstants
  from "@opsera/definitions/constants/api/request/endpoint/endpointResponseEvaluationOption.constants";

function EndpointResponseEvaluationOptionSelectInput(
  {
    model,
    setModel,
    fieldName,
    disabled,
    setDataFunction,
    clearDataFunction,
  }) {
  return (
    <SelectInputBase
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      textField={"text"}
      valueField={"value"}
      dataObject={model}
      clearDataFunction={clearDataFunction}
      selectOptions={endpointResponseEvaluationOptionConstants.ENDPOINT_RESPONSE_EVALUATION_OPTION_SELECT_OPTIONS}
      fieldName={fieldName}
      disabled={disabled}
    />
  );
}

EndpointResponseEvaluationOptionSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default EndpointResponseEvaluationOptionSelectInput;