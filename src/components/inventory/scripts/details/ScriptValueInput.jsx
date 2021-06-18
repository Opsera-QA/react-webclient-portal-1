import React from "react";
import PropTypes from "prop-types";
import CodeInput from "components/common/inputs/code/CodeInput";
import {getScriptLanguageDisplayMode} from "components/common/list_of_values_input/inventory/scripts/ScriptLanguageSelectInput";

function ScriptValueInput({model, setModel, fieldName, className, isLoading, disabled}) {
  return (
    <CodeInput
      disabled={disabled}
      isLoading={isLoading}
      mode={getScriptLanguageDisplayMode(model?.getData("type"))}
      className={className}
      model={model}
      setModel={setModel}
      fieldName={fieldName}
      // titleBarActionButtons={}
    />
  );
}

ScriptValueInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

ScriptValueInput.defaultProps = {
  fieldName: "value"
};

export default ScriptValueInput;