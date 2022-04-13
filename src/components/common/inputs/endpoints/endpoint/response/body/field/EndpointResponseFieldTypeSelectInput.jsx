import React from "react";
import PropTypes from "prop-types";
import ApiResponseFieldTypeSelectInput
  from "components/common/list_of_values_input/api/response/body/fields/ApiResponseFieldTypeSelectInput";

function EndpointResponseFieldTypeSelectInput(
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
    updateModelFunction(newModel);
  };

  return (
    <ApiResponseFieldTypeSelectInput
      model={model}
      setModel={setModel}
      fieldName={fieldName}
      disabled={disabled}
      setDataFunction={setDataFunction}
    />
  );
}

EndpointResponseFieldTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  updateModelFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointResponseFieldTypeSelectInput;