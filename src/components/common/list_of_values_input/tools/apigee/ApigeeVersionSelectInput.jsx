import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO: Make constants
const APIGEE_VERSIONS = [
  {
    name: "Edge",
    value: "edge"
  },
];

function ApigeeVersionSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
    disabled,
  }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={APIGEE_VERSIONS}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Apigee Version"}
      disabled={disabled}
    />
  );
}

ApigeeVersionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  clearDataFunction: PropTypes.func,
};

export default ApigeeVersionSelectInput;
