import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const NEXUS_REPO_TYPES = [
  {
    name: "Maven",
    value: "maven2"
  },
  {
    name: "Docker",
    value: "docker"
  },
  {
    name: "NuGet",
    value: "nuget "
  }
];

const NexusRepoFormatSelectInput = ({dataObject, setDataObject, disabled}) => {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("repositoryFormat", selectedOption.value);
    newDataObject.setData("repositoryName", "");
    if(selectedOption.value === "docker"){
      newDataObject.setData("groupName", "");
      newDataObject.setData("artifactName", "");
    }else {
      newDataObject.setData("toolConfigId", "");
      newDataObject.setData("jobType", "");
      newDataObject.setData("jobDescription", "");
      newDataObject.setData("toolJobType", "");
      newDataObject.setData("agentLabels", "");
      newDataObject.setData("dockerPort", "");
    }
    setDataObject({...newDataObject});
  };

  const clearDataFunction = (fileName) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("repositoryFormat", "");    
    newDataObject.setData("repositoryName", "");
    newDataObject.setData("toolConfigId", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("jobDescription", "");
    newDataObject.setData("toolJobType", "");
    newDataObject.setData("agentLabels", "");
    newDataObject.setData("dockerPort", "");
    newDataObject.setData("groupName", "");
    newDataObject.setData("artifactName", "");
    setDataObject({...newDataObject});
  };

  const getPlaceholderText = () => {
    if (dataObject.getData("nexusToolConfigId") === "") {
      return "A Nexus Tool must be selected before selecting Repos";
    }    
  };

  return (
    <SelectInputBase
      fieldName={"repositoryFormat"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={NEXUS_REPO_TYPES}      
      valueField="value"
      textField="name"
      placeholderText={getPlaceholderText()}
      disabled={disabled || dataObject.getData("nexusToolConfigId") === ""}
    />
  );
};

NexusRepoFormatSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,    
  disabled: PropTypes.bool,  
};

NexusRepoFormatSelectInput.defaultProps = {
  disabled: false
};

export default NexusRepoFormatSelectInput;
