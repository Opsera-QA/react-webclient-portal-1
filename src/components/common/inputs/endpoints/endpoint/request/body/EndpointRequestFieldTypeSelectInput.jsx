import React from "react";
import PropTypes from "prop-types";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
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

function EndpointRequestFieldTypeSelectInput(
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
      value={model?.getData("type")}
      disabled={disabled}
      setDataFunction={setDataFunction}
    />
  );
}

EndpointRequestFieldTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default EndpointRequestFieldTypeSelectInput;