import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function JfrogMavenToolInput({dataObject, setDataObject, disabled}) {

  const setJfrogTool = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("jfrogToolConfigId", selectedOption.id);
    setDataObject({...newDataObject});
  };

  return (
     <PipelineToolInput
       toolType={"jfrog_artifactory_maven"}
       toolFriendlyName={"JFrog"}
       fieldName={"jfrogToolConfigId"}
       placeholderText={"Select JFrog Tool"}
       configurationRequired={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setJfrogTool}
       disabled={disabled}
     />
  );
}

JfrogMavenToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default JfrogMavenToolInput;
