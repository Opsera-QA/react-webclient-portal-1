import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

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

function EndpointResponseFieldTypeSelectInput(
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

EndpointResponseFieldTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointResponseFieldTypeSelectInput;