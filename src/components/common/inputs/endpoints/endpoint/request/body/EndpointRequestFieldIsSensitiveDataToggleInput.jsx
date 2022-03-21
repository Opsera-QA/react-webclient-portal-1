import React from "react";
import PropTypes from "prop-types";
import StandaloneBooleanToggleInput from "components/common/inputs/boolean/StandaloneBooleanToggleInput";

function EndpointRequestFieldIsSensitiveDataToggleInput(
  {
    model,
    updateMainModelFunction,
    disabled,
    index,
  }) {
  const updateMainModel = (fieldId, newValue) => {
    updateMainModelFunction("isSensitiveData", newValue);
  };
  
  return (
    <StandaloneBooleanToggleInput
      setDataFunction={updateMainModel}
      fieldId={`${index}-request-isSensitiveData`}
      fieldLabel={model.getLabel("isSensitiveData")}
      checkedValue={model?.getData("isSensitiveData")}
      disabled={disabled}
      className={"my-auto"}
    />
  );
}

EndpointRequestFieldIsSensitiveDataToggleInput.propTypes = {
  model: PropTypes.object,
  updateMainModelFunction: PropTypes.func,
  disabled: PropTypes.bool,
  index: PropTypes.bool,
};

export default EndpointRequestFieldIsSensitiveDataToggleInput;