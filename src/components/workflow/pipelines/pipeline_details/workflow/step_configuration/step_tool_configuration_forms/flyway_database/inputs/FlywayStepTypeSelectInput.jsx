import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const STEP_TYPE = [
  { value: "info", text: "View pending migrations" },
  { value: "deploy", text: "Deploy pending migrations" },
];

function FlywayStepTypeSelectInput({ fieldName, model, setModel, setDataFunction, clearDataFunction, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={STEP_TYPE}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

FlywayStepTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default FlywayStepTypeSelectInput;