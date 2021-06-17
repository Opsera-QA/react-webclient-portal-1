import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const SCRIPT_LIBRARY_LANGUAGES = [
  {value: "cli", text: "CLI"},
  {value: "powershell", text: "Powershell"},
  {value: "c_sharp", text: "C#"},
  {value: "f_sharp", text: "F#"},
  {value: "python", text: "Python"}
];

function ScriptLanguageSelectInput({fieldName, dataObject, setDataObject, disabled}) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={SCRIPT_LIBRARY_LANGUAGES}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

ScriptLanguageSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

ScriptLanguageSelectInput.defaultProps = {
  fieldName: "type",
};

export default ScriptLanguageSelectInput;