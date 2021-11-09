import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const PACKAGE_TYPES = [
  {
    name: "Maven",
    value: "Maven"
  },
  {
    name: "NuGet",
    value: "NuGet"
  }
];

const JFrogMavenPackageTypeInput = ({dataObject, setDataObject, disabled, fieldName}) => {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("packageType", selectedOption.value);    
    setDataObject({...newDataObject});
  };

  const clearDataFunction = (fileName) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("packageType", "");
    setDataObject({...newDataObject});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={PACKAGE_TYPES}      
      valueField="value"
      textField="name"
      placeholderText="Select Package Type"
      disabled={disabled}
    />
  );
};

JFrogMavenPackageTypeInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,    
  disabled: PropTypes.bool,  
  fieldName: PropTypes.string,
};

JFrogMavenPackageTypeInput.defaultProps = {
  disabled: false
};

export default JFrogMavenPackageTypeInput;
