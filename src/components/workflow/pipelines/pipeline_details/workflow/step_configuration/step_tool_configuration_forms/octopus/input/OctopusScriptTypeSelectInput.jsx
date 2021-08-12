import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function OctopusScriptTypeSelectInput({dataObject, setDataObject, isLoading, disabled, tool_prop, fieldName}) {

  const ACTION_LIST =
    dataObject?.getData("octopusPlatformType") === "Kubernetes"
      ? [
          {
            name: "Inline",
            value: "inline",
          },
        ]
      : [
          {
            name: "Inline",
            value: "inline",
          },
          {
            name: "Package",
            value: "package",
          },
        ];

  if (!tool_prop || (tool_prop && tool_prop.length === 0) || (tool_prop && tool_prop !== "Script")) {
    return null;
  }

  const setDataFunction = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData("scriptFileName", "");
    newDataObject.setData("scriptParameters", "");
    newDataObject.setData("scriptId", "");
    newDataObject.setData(fieldName, value.value);
    setDataObject({...newDataObject});
  };

  return (

    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={ACTION_LIST}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Script Source"}
      disabled={disabled}
      busy={isLoading}
    />
  );
}

OctopusScriptTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  tool_prop: PropTypes.string,
  fieldName: PropTypes.string
};

OctopusScriptTypeSelectInput.defaultProps = {
  fieldName: "scriptSource"
};

export default OctopusScriptTypeSelectInput;