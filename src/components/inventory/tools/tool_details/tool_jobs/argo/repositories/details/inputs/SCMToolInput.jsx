import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function SCMToolInput({dataObject, setDataObject, disabled}) {
  const setScmTool = (fieldName, selectedOption) => {    
    let newDataObject = {...dataObject};
    newDataObject.setData("gitToolId", selectedOption?.id);
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("repositoryName", "");
    newDataObject.setData("workspace", "");
    setDataObject({...newDataObject});
  };

  return (
     <PipelineToolInput
       toolType={dataObject.getData("service")}
       toolFriendlyName={"SCM Tool"}
       fieldName={"gitToolId"}
       configurationRequired={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setScmTool}
       disabled={disabled || !dataObject.getData("service") || dataObject.getData("service").length < 0}
     />
  );
}

SCMToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SCMToolInput;