import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetExternalApiIntegratorEndpointById
  from "hooks/tools/external_api_integrator/endpoints/useGetExternalApiIntegratorEndpointById";

export default function ExternalApiIntegratorToolEndpointResponseBodyFieldSelectInput(
  {
    fieldName,
    model,
    setModel,
    toolId,
    endpointId,
    disabled,
    setDataFunction,
    clearDataFunction,
    valueField,
    textField,
  }) {
  const {
    isLoading,
    error,
    responseBodyFields,
  } = useGetExternalApiIntegratorEndpointById(toolId, endpointId);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={responseBodyFields}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      error={error}
    />
  );
}

ExternalApiIntegratorToolEndpointResponseBodyFieldSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string.isRequired,
  endpointId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};
