import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const NEXUS_STEP_TYPES = [
{
  name: "Push Artifacts",
  value: "push",
}
// {
//   name: "Pull Artifact",
//   value: "pull",
// },
];

const NexusStepTypeSelectInput = ({dataObject, setDataObject, disabled}) => {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("type", selectedOption.value);
    if (selectedOption.value === "pull"){
      newDataObject.setData("artifactStepId", "");
    }
    setDataObject({...newDataObject});
  };

  const clearDataFunction = (fileName) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("type", "");    
    setDataObject({...newDataObject});
  };

  return (
    <SelectInputBase
      fieldName={"type"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={NEXUS_STEP_TYPES}      
      valueField="value"
      textField="name"      
      disabled={disabled || dataObject.getData("nexusToolConfigId") === ""}
    />
  );
};

NexusStepTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

NexusStepTypeSelectInput.defaultProps = {
  disabled: false
};

export default NexusStepTypeSelectInput;
