import React from "react";
import PropTypes from "prop-types";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";

const SUPPORTED_FIELD_TYPES = [
  // {
  //   text: "Array",
  //   value: "array",
  // },
  {
    text: "String",
    value: "string",
  },
  {
    text: "Date",
    value: "date",
  },
];

function EndpointRequestFieldTypeStandaloneSelectInput(
  {
    model,
    updateMainModelFunction,
    disabled,
  }) {
  const updateMainModel = (newValue) => {
    updateMainModelFunction("type", newValue);
  };
  
  return (
    <StandaloneSelectInput
      selectOptions={SUPPORTED_FIELD_TYPES}
      valueField={"value"}
      textField={"text"}
      value={model?.getData("type")}
      disabled={disabled}
      setDataFunction={updateMainModel}
    />
  );
}

EndpointRequestFieldTypeStandaloneSelectInput.propTypes = {
  model: PropTypes.object,
  updateMainModelFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointRequestFieldTypeStandaloneSelectInput;