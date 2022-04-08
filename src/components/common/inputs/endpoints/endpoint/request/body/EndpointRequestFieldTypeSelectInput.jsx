import React from "react";
import PropTypes from "prop-types";
import ApiRequestFieldTypeSelectInput
  from "components/common/list_of_values_input/api/request/body/ApiRequestFieldTypeSelectInput";

function EndpointRequestFieldTypeSelectInput(
  {
    model,
    setModel,
    fieldName,
    updateModelFunction,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setData(fieldName, selectedOption?.value);
    newModel.setDefaultValue("isSensitiveData");
    newModel.setDefaultValue("isRequired");
    updateModelFunction(newModel);
  };

  return (
    <ApiRequestFieldTypeSelectInput
      model={model}
      setModel={setModel}
      fieldName={fieldName}
      disabled={disabled}
      setDataFunction={setDataFunction}
    />
  );
}

EndpointRequestFieldTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  updateModelFunction: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default EndpointRequestFieldTypeSelectInput;