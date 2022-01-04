import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const STEP_TYPE = [
  { value: "export", text: "Export Objects" },
  { value: "import", text: "Import Objects" },
];

function InformaticaConfigTypeSelectInput({ fieldName, model, setModel, setDataFunction, clearDataFunction, disabled }) {
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

InformaticaConfigTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default InformaticaConfigTypeSelectInput;