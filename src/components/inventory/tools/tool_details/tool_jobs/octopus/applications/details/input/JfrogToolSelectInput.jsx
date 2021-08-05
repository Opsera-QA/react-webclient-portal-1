import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";


const JfrogToolSelectInput = ({ dataObject, setDataObject, fieldName, disabled }) => {

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, selectedOption.id);
    setDataObject({...newDataObject});
  };

  return (
     <PipelineToolInput
       toolType={"jfrog_artifactory_maven"}
       toolFriendlyName={"JFrog"}
       fieldName={fieldName}
       placeholderText={"Select JFrog Tool"}
       configurationRequired={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setDataFunction}
       disabled={disabled}
     />
  );
};

JfrogToolSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default JfrogToolSelectInput;
