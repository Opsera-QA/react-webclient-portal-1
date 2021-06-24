import React from "react";
import PropTypes from "prop-types";
import {getScriptLanguageDisplayMode} from "components/common/list_of_values_input/inventory/scripts/ScriptLanguageSelectInput";
import CodeFieldBase from "components/common/fields/code/CodeFieldBase";

function ScriptLibraryCodeField({model, fieldName, className, isLoading}) {
  return (
    <CodeFieldBase
      isLoading={isLoading}
      mode={getScriptLanguageDisplayMode(model?.getData("type"))}
      className={className}
      fieldName={fieldName}
      model={model}
    />
  );
}

ScriptLibraryCodeField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  isLoading: PropTypes.bool
};

export default ScriptLibraryCodeField;