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

function ApiRequestFieldTypeSelectInput(
  {
    model,
    setModel,
    fieldName,
    setDataFunction,
    disabled,
  }) {
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

ApiRequestFieldTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default ApiRequestFieldTypeSelectInput;