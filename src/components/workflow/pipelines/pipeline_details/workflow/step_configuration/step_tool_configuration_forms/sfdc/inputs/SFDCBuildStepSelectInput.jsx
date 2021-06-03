import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function SFDCBuildStepSelectInput({ fieldName, dataObject, setDataObject, setDataFunction, disabled, listOfSteps }) {    
    return (
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={listOfSteps}
        setDataFunction={setDataFunction}
        valueField="_id"
        textField="name"
        disabled={disabled}
      />
    );
  }
  
  SFDCBuildStepSelectInput.propTypes = {
    currentPipelineId: PropTypes.string,
    fieldName: PropTypes.string,
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    setDataFunction: PropTypes.func,
    disabled:  PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.array,
    ]),
    listOfSteps: PropTypes.array
  };
  
  export default SFDCBuildStepSelectInput;
