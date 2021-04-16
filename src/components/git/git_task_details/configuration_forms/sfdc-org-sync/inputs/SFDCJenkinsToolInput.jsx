import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function SFDCJenkinsToolInput({dataObject, setDataObject, disabled}) {
  const setJenkinsTool = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("toolConfigId", selectedOption?.id);
    newDataObject.setData("toolName", selectedOption?.name);
    newDataObject.setData("autoScaleEnable", selectedOption?.configuration?.autoScaleEnable);
    newDataObject.setData("toolJobName", "");
    newDataObject.setData("toolJobId", "");
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
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

SFDCJenkinsToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SFDCJenkinsToolInput;