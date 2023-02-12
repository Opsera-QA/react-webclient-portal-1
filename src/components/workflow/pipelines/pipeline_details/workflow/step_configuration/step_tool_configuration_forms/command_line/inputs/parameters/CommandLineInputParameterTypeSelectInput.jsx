import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO: Make constants file
const INPUT_PARAMETER_TYPES = [
  {
    name: "Global",
    value: "global",
  },
  {
    name: "Local",
    value: "local",
  }
];

export default function CommandLineInputParameterTypeSelectInput(
  {
    model, 
    setModel, 
    isLoading, 
    disabled,
  }) {  
  const setDataFunction = async (fieldName, selectedOption) => {
    model.resetData();
    model.setData("type", selectedOption?.value);

    if (selectedOption?.value === "global") {
      model.setData("name", "");
    }

    setModel({ ...model });
  };

  return (

    <SelectInputBase
      fieldName={"type"}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={INPUT_PARAMETER_TYPES}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Type"}
      disabled={disabled}
      busy={isLoading}
    />
  );
}

CommandLineInputParameterTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};