import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const dotnetType = [
    {name : ".Net (core)", value: "dotnet"},
    {name : ".Net Framework", value: "dotnet-framework"},
];

function DotNetCliTypeSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {
  
  const setDataFunction = async (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData("dotnetType", value.value);
    newDataObject.setData("dotnetSdkVersion", "");
    setDataObject({ ...newDataObject });
  };
    
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={dotnetType}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

DotNetCliTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

DotNetCliTypeSelectInput.defaultProps = {
  fieldName: "dotnetType",
  valueField: "value",
  textField: "name"
};

export default DotNetCliTypeSelectInput;