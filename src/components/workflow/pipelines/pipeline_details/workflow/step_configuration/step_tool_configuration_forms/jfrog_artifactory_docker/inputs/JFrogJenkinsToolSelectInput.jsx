import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function JfrogJenkinsToolInput({dataObject, setDataObject, disabled}) {

  const setJfrogJenkinsTool = (fieldName, selectedOption) => {
    dataObject.setData("toolConfigId", "");
    let newDataObject = {...dataObject};
    newDataObject.setData("toolConfigId", selectedOption.id);
    newDataObject.setData("toolJobName","");
    newDataObject.setData("toolJobId","");
    newDataObject.setData("jobType","");
    newDataObject.setData("jobDescription","");
    newDataObject.setData("toolJobType","");
    newDataObject.setData("agentLabels","");
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
      setDataFunction={setJfrogJenkinsTool}
      disabled={disabled}
    />
  );
}

JfrogJenkinsToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default JfrogJenkinsToolInput;