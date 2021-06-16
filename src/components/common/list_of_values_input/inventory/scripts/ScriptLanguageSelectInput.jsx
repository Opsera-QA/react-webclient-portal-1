import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const SCRIPT_LIBRARY_LANGUAGES = [
  {text: "cli", value: "CLI"},
  {text: "powershell", value: "Powershell"},
  {text: "c_sharp", value: "C#"},
  {text: "f_sharp", value: "F#"},
  {text: "python", value: "Python"}
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