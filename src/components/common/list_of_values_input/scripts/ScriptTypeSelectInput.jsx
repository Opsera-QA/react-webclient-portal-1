import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {SCRIPT_TYPE_SELECT_OPTIONS} from "components/common/list_of_values_input/scripts/scriptType.constants";

function ScriptTypeSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    setDataFunction,
  }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={SCRIPT_TYPE_SELECT_OPTIONS}
      setDataFunction={setDataFunction}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

ScriptTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ScriptTypeSelectInput;