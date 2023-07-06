import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import endpointRequestType from "@opsera/definitions/constants/api/request/endpoint/endpointRequestType.constants";

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
      selectOptions={endpointRequestType.ENDPOINT_REQUEST_TYPE_SELECT_OPTIONS}
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