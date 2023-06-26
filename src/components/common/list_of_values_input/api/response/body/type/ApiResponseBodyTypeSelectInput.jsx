import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const SUPPORTED_FIELD_TYPES = [
  {
    text: "Array",
    value: "array",
  },
  {
    text: "Boolean",
    value: "boolean",
  },
  {
    text: "Date",
    value: "date",
  },
  {
    text: "Integer",
    value: "integer",
  },
  {
    text: "Number",
    value: "number",
  },
  {
    text: "Object",
    value: "object",
  },
  {
    text: "String",
    value: "string",
  },
];

function ApiResponseBodyTypeSelectInput(
  {
    model,
    setModel,
    fieldName,
    disabled,
    setDataFunction,
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

ApiResponseBodyTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

export default ApiResponseBodyTypeSelectInput;