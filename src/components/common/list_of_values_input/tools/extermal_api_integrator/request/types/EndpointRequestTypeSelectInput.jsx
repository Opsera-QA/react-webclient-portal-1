import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {
  ENDPOINT_REQUEST_TYPE_SELECT_OPTIONS
} from "components/common/list_of_values_input/tools/extermal_api_integrator/request/types/endpointRequestType.constants";

function EndpointRequestTypeSelectInput(
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
      selectOptions={ENDPOINT_REQUEST_TYPE_SELECT_OPTIONS}
      fieldName={fieldName}
      disabled={disabled}
    />
  );
}

EndpointRequestTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default EndpointRequestTypeSelectInput;