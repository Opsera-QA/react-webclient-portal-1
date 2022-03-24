import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TestExternalEndpointUrlConnectionButton
  from "components/inventory/tools/details/identifiers/external_api_integrator/connection/inputs/connection_check/TestExternalEndpointUrlConnectionButton";

function ExternalApiIntegratorConnectionCheckUrlTextInput(
  {
    fieldName,
    model,
    setModel,
    className,
    disabled,
    setDataFunction,
  }) {
  const getInputButton = () => {
    return (
      <TestExternalEndpointUrlConnectionButton
        endpointUrl={model?.getData(fieldName)}
        disabled={model?.isChanged(fieldName)}
      />
    );
  };

  return (
    <TextInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
      setDataFunction={setDataFunction}
      rightSideInputButton={getInputButton()}
    />
  );
}

ExternalApiIntegratorConnectionCheckUrlTextInput.propTypes = {
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default ExternalApiIntegratorConnectionCheckUrlTextInput;