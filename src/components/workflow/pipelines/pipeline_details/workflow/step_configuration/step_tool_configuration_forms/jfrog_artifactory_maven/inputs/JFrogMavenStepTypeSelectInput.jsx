import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const JFROG_STEP_TYPES = [
  {
    name: "Push Artifacts",
    value: "push",
  }
];

const JFrogMavenStepTypeSelectInput = ({dataObject, setDataObject, disabled}) => {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("type", selectedOption.value); 
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
      selectOptions={JFROG_STEP_TYPES}      
      valueField="value"
      textField="name"      
      disabled={disabled || dataObject.getData("jfrogToolConfigId") === ""}
    />
  );
};

JFrogMavenStepTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

JFrogMavenStepTypeSelectInput.defaultProps = {
  disabled: false
};

export default JFrogMavenStepTypeSelectInput;
