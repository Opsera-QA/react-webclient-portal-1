import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import TextInputBase from "../../../../../../../../common/inputs/text/TextInputBase";
import ScriptLibrarySelectInput
  from "../../../../../../../../common/list_of_values_input/inventory/scripts/ScriptLibrarySelectInput";

function OctopusKubernetesScriptView({dataObject, setDataObject, isLoading, disabled, tool_prop}) {

  if (!tool_prop || (tool_prop && tool_prop.length === 0) || (tool_prop && tool_prop !== "Script")) {
    return null;
  }

  if (!dataObject?.getData("scriptSource") || dataObject?.getData("scriptSource") && dataObject?.getData("scriptSource").length === 0) {
    return null;
  }

  const getPackageFields = () => {
    if (dataObject?.getData("scriptSource") === "package") {
      return (
        <>
          <TextInputBase
            setDataObject={setDataObject}
            dataObject={dataObject}
            fieldName={"scriptFileName"}
          />
        </>
      );
    }
  };

  const getInlineFields = () => {
    if (dataObject?.getData("scriptSource") === "inline") {
      return (
        <>
          <ScriptLibrarySelectInput
            fieldName={"scriptId"}
            model={dataObject}
            setModel={setDataObject}
            busy={isLoading}
            disabled={disabled || isLoading}
          />
        </>
      );
    }
  };

  return (
    <>
      {getPackageFields()}
      {getInlineFields()}
    </>
  );
}

OctopusKubernetesScriptView.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  tool_prop: PropTypes.string
};

export default OctopusKubernetesScriptView;