import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const SUPPORTED_FIELD_TYPES = [
  {
    text: "Array",
    value: "array",
  },
  {
    text: "String",
    value: "string",
  },
  {
    text: "Date",
    value: "date",
  },
];

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
    <SelectInputBase
      selectOptions={SUPPORTED_FIELD_TYPES}
      dataObject={model}
      setDataObject={setModel}
      fieldName={fieldName}
      valueField={"value"}
      textField={"text"}
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