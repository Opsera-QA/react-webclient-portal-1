import React, {useState} from "react";
import PropTypes from "prop-types";
import CodeInput from "components/common/inputs/code/CodeInput";
import {getScriptLanguageDisplayMode} from "components/common/list_of_values_input/inventory/scripts/ScriptLanguageSelectInput";
import PullScriptValueIcon from "components/inventory/scripts/details/PullScriptValueIcon";

function ScriptValueInput({model, setModel, fieldName, className, disabled}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getPullScriptIcon = () => {
    return (
      <PullScriptValueIcon
        setIsLoading={setIsLoading}
        loadScriptFunction={model?.pullScriptFromDb}
        setErrorMessage={setErrorMessage}
      />
    );
  };

  return (
    <CodeInput
      disabled={model?.canUpdate() !== true || disabled}
      isLoading={isLoading}
      mode={getScriptLanguageDisplayMode(model?.getData("type"))}
      className={className}
      model={model}
      dataPullError={errorMessage}
      setModel={setModel}
      fieldName={fieldName}
      isDataPulled={model?.isNew() || model?.hasScriptBeenPulled()}
      titleBarActionButtons={getPullScriptIcon()}
    />
  );
}

ScriptValueInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

ScriptValueInput.defaultProps = {
  fieldName: "value"
};

export default ScriptValueInput;