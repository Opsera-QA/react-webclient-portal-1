import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import usStateList from "components/user/states";

function UsStateSelectInput({ fieldName, model, setModel, setDataFunction, disabled, textField, valueField}) {
  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={usStateList}
        setDataFunction={setDataFunction}
        valueField={valueField}
        textField={textField}
        // placeholderText={placeholderText}
        disabled={disabled}
      />
    </div>
  );
}

UsStateSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

UsStateSelectInput.defaultProps = {
  valueField: "value",
  textField: "text"
};

export default UsStateSelectInput;