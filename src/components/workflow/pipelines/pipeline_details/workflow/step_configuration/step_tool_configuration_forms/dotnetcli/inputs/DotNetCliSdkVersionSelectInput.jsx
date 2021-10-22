import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const dotnetCoreVersions = [
  {name : ".Net (core) Version 2.1.816", value: "2.1.816"},
  {name : ".Net (core) Version 3.1.414", value: "3.1.414"},
  {name : ".Net (core) Version 5.0.303", value: "5.0.303"},
  {name : ".Net (core) Version 6.0", value: "6.0"},
];

const dotnetFrameworkVersions = [
  {name : ".Net Framework Version 3.5", value: "3.5"},
  {name : ".Net Framework Version 4.7.1", value: "4.7.1"},
  {name : ".Net Framework Version 4.7.2", value: "4.7.2"},
  {name : ".Net Framework Version 4.8", value: "4.8"},
];

function DotNetCliSdkVersionSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={dataObject?.getData("dotnetType")==="dotnet" ?  dotnetCoreVersions : dotnetFrameworkVersions }
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

DotNetCliSdkVersionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

DotNetCliSdkVersionSelectInput.defaultProps = {
  fieldName: "dotnetSdkVersion",
  valueField: "value",
  textField: "name"
};

export default DotNetCliSdkVersionSelectInput;