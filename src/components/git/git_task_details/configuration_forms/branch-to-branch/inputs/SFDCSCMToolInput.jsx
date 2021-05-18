import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function SFDCSCMToolInput({dataObject, setDataObject, disabled}) {
  const setSfdcScmTool = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("gitToolId", selectedOption?.id);
    newDataObject.setData("gitCredential", selectedOption?.name);
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("sourceBranch", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("autoApprove", false);
    newDataObject.setData("reviewers", []);
    newDataObject.setData("reviewerNames", []);
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
       setDataFunction={setSfdcScmTool}
       disabled={!dataObject.getData("service") || dataObject.getData("service").length < 0}
     />
  );
}

SFDCSCMToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SFDCSCMToolInput;