import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const REPO_TYPES = [
  {
    name: "Maven",
    value: "Maven"
  },
  {
    name: "NuGet",
    value: "NuGet"
  }
];

const JFrogRepositoryFormatSelectInput = ({dataObject, setDataObject, disabled}) => {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("repositoryFormat", selectedOption.value);
    newDataObject.setData("repositoryName", "");
    newDataObject.setData("groupName", "");
    newDataObject.setData("serverPath", "");
    newDataObject.setData("artifactName", "");
    setDataObject({...newDataObject});
  };

  const clearDataFunction = (fileName) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("repositoryFormat", "");    
    newDataObject.setData("repositoryName", "");
    newDataObject.setData("groupName", "");
    newDataObject.setData("artifactName", "");
    newDataObject.setData("serverPath", "");
    setDataObject({...newDataObject});
  };

  const getPlaceholderText = () => {
    if (dataObject.getData("jfrogToolConfigId") === "") {
      return "A JFrog Tool must be selected before selecting Repos";
    }    
  };

  return (
    <SelectInputBase
      fieldName={"repositoryFormat"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={REPO_TYPES}      
      valueField="value"
      textField="name"
      placeholderText={getPlaceholderText()}
      disabled={disabled || dataObject.getData("jfrogToolConfigId") === ""}
    />
  );
};

JFrogRepositoryFormatSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,    
  disabled: PropTypes.bool,  
};

JFrogRepositoryFormatSelectInput.defaultProps = {
  disabled: false
};

export default JFrogRepositoryFormatSelectInput;
