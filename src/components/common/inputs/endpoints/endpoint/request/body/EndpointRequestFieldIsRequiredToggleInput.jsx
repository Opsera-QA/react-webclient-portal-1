import React from "react";
import PropTypes from "prop-types";
import StandaloneBooleanToggleInput from "components/common/inputs/boolean/StandaloneBooleanToggleInput";

function EndpointRequestFieldIsRequiredToggleInput(
  {
    model,
    updateMainModelFunction,
    disabled,
    index,
  }) {
  const updateMainModel = (fieldId, newValue) => {
    updateMainModelFunction("isRequired", newValue);
  };
  
  return (
    <StandaloneBooleanToggleInput
      setDataFunction={updateMainModel}
      fieldId={`${index}-request-isRequired`}
      fieldLabel={model.getLabel("isRequired")}
      checkedValue={model?.getData("isRequired")}
      disabled={disabled}
      className={"my-auto"}
    />
  );
}

EndpointRequestFieldIsRequiredToggleInput.propTypes = {
  model: PropTypes.object,
  updateMainModelFunction: PropTypes.func,
  disabled: PropTypes.bool,
  index: PropTypes.number,
};

export default EndpointRequestFieldIsRequiredToggleInput;