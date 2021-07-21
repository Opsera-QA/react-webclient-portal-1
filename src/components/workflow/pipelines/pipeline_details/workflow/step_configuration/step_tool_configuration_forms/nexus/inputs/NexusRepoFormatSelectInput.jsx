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
  }
];

const NexusRepoFormatSelectInput = ({visible, dataObject, setDataObject, disabled, nexusToolConfigId}) => {
  
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
      newDataObject.setData("jobName", "");
      newDataObject.setData("agentLabels", "");
      newDataObject.setData("port", "");
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
    newDataObject.setData("jobName", "");
    newDataObject.setData("agentLabels", "");
    newDataObject.setData("port", "");
    newDataObject.setData("groupName", "");
    newDataObject.setData("artifactName", "");
    setDataObject({...newDataObject});
  };

  const getPlaceholderText = () => {
    if (nexusToolConfigId === "") {
      return "A Nexus Tool must be selected before selecting Repos";
    }    
  };

  if (!visible) {
    return <></>;
  }

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
      disabled={disabled || nexusToolConfigId === ""}
    />
  );
};

NexusRepoFormatSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,  
  nexusToolConfigId: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

NexusRepoFormatSelectInput.defaultProps = {
  visible: true
};

export default NexusRepoFormatSelectInput;