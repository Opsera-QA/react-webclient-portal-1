import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function EndpointRequestHeaderUseAuthorizationTokenToggleInput(
  {
    model,
    updateMainModelFunction,
    disabled,
  }) {
  const setDataFunction = (fieldName, newValue) => {
    const newModel = {...model};
    newModel.setData(fieldName, newValue);
    newModel.setDefaultValue("authorizationTokenCustomParameterId");
    updateMainModelFunction(newModel);
  };
  
  return (
    <BooleanToggleInput
      dataObject={model}
      setDataFunction={setDataFunction}
      fieldName={"useAuthorizationToken"}
      disabled={disabled}
      className={"my-auto"}
    />
  );
}

EndpointRequestHeaderUseAuthorizationTokenToggleInput.propTypes = {
  model: PropTypes.object,
  updateMainModelFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointRequestHeaderUseAuthorizationTokenToggleInput;