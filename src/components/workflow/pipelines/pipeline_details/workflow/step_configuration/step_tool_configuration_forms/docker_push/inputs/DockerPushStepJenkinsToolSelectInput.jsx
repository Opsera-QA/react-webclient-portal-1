import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function DockerPushStepJenkinsToolSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("toolConfigId", selectedOption?._id);
    newModel.setData("toolName",selectedOption?.name);
    newModel.setData("toolJobName", "");
    newModel.setData("toolJobId", "");
    newModel.setData("jobType", "");
    newModel.setData("type", "");
    newModel.setData("gitToolId", "");
    newModel.setData("gitUrl", "");
    newModel.setData("sshUrl", "");
    newModel.setData("gitCredential", "");
    newModel.setData("repository", "");
    newModel.setData("gitBranch", "");
    newModel.setData("workspace", "");
    newModel.setData("autoScaleEnable", selectedOption?.configuration?.autoScaleEnable || false);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData("toolConfigId", "");
    newModel.setData("toolName", "");
    newModel.setData("toolJobName", "");
    newModel.setData("toolJobId", "");
    newModel.setData("jobType", "");
    newModel.setData("type", "");
    newModel.setData("gitToolId", "");
    newModel.setData("gitUrl", "");
    newModel.setData("sshUrl", "");
    newModel.setData("gitCredential", "");
    newModel.setData("repository", "");
    newModel.setData("gitBranch", "");
    newModel.setData("workspace", "");
    newModel.setData("autoScaleEnable", false);
    setModel({...newModel});
  };

  return (
     <RoleRestrictedJenkinsToolSelectInput
       fieldName={"toolConfigId"}
       model={model}
       setModel={setModel}
       clearDataFunction={clearDataFunction}
       setDataFunction={setDataFunction}
       disabled={disabled}
     />
  );
}

DockerPushStepJenkinsToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DockerPushStepJenkinsToolSelectInput;