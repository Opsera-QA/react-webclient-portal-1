import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const AUTH_TYPES = [
  { text: "Basic", value: "basic" },
  { text: "OAuth", value: "oauth" }
];

function SfdcAuthTypeSelectInput({ fieldName, model, setModel, disabled }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData(fieldName, selectedOption?.value);    
    setModel({ ...newModel });
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={AUTH_TYPES}
      setDataFunction={setDataFunction}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

SfdcAuthTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

SfdcAuthTypeSelectInput.defaultProps = {
  fieldName: "authType"
};

export default SfdcAuthTypeSelectInput;
