import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function AzureCliScriptTypeSelectInput(
  {model, setModel, disabled, fieldName}) {

  const JOB_TYPES = [
    {
      name: "Inline",
      value: "inline",
    },
    {
      name: "Script",
      value: "script",
    },
    {
      name: "Package",
      value: "package",
    }
  ];

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, selectedOption.value);
    newDataObject.setData("artifactStepId", "");
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("artifactStepId", "");
    setModel({...newDataObject});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={JOB_TYPES}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select a Script Type"}
      disabled={disabled}
      busy={disabled}
    />
  );
}


AzureCliScriptTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

AzureCliScriptTypeSelectInput.defaultProps = {
  fieldName: "scriptType",
  disabled: false
};

export default AzureCliScriptTypeSelectInput;
