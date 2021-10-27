import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function DotNetStepJenkinsToolSelectInput({dataObject, setDataObject, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("toolConfigId", selectedOption?._id);
    newDataObject.setData("toolName",selectedOption?.name);
    newDataObject.setData("toolJobName", "");
    newDataObject.setData("toolJobId", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("type", "");
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("workspace", "");
    setDataObject({...newDataObject});
  };

  return (
    <RoleRestrictedJenkinsToolSelectInput
      fieldName={"toolConfigId"}
      configurationRequired={true}
      model={dataObject}
      setModel={setDataObject}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

DotNetStepJenkinsToolSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DotNetStepJenkinsToolSelectInput;