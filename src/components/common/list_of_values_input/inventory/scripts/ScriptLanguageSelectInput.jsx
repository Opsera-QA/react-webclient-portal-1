import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const SCRIPT_LIBRARY_LANGUAGES = [
  {value: "bash", text: "Bash", mode: "io"},
  {value: "powershell", text: "Powershell", mode: "powershell"},
  {value: "c_sharp", text: "C#", mode: "csharp"},
  {value: "f_sharp", text: "F#", mode: "fsharp"},
  {value: "python", text: "Python", mode: "python"}
];

export const getScriptLanguageDisplayText = (value) => {
  if (value == null || value === "") {
    return "";
  }

  const foundScriptLanguage = SCRIPT_LIBRARY_LANGUAGES.find((language) => {return language.value === value;});

  if (foundScriptLanguage == null) {
    return "";
  }

  return (foundScriptLanguage.text);
};

export const getScriptLanguageDisplayMode = (value) => {
  if (value == null || value === "") {
    return "io";
  }

  const foundScriptLanguage = SCRIPT_LIBRARY_LANGUAGES.find((language) => {return language.value === value;});

  if (foundScriptLanguage == null) {
    return "io";
  }

  return (foundScriptLanguage.mode);
};

function ScriptLanguageSelectInput({fieldName, model, setModel, disabled}) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={SCRIPT_LIBRARY_LANGUAGES}
      valueField={"value"}
      textField={"text"}
      disabled={model?.canUpdate() !== true || disabled}
    />
  );
}

ScriptLanguageSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

ScriptLanguageSelectInput.defaultProps = {
  fieldName: "type",
};

export default ScriptLanguageSelectInput;