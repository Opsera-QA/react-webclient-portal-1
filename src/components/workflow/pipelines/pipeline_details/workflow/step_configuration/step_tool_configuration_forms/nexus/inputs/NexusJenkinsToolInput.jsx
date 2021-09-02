import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function NexusJenkinsToolInput({dataObject, setDataObject, disabled}) {
  const setJenkinsTool = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("toolConfigId", selectedOption.id);
    newDataObject.setData("toolName", selectedOption.name);
    newDataObject.setData("jobType", "NEXUS_DOCKER_PUSH");
    newDataObject.setData("jobDescription", "");
    newDataObject.setData("toolJobType", ["DOCKER PUSH"]);
    newDataObject.setData("agentLabels", "generic-linux");
    setDataObject({...newDataObject});
  };

  return (
     <PipelineToolInput
       toolType={"jenkins"}
       toolFriendlyName={"Jenkins"}
       fieldName={"toolConfigId"}
       configurationRequired={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setJenkinsTool}
       disabled={disabled}
     />
  );
}

NexusJenkinsToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default NexusJenkinsToolInput;