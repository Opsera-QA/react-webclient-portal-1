import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function CommandLineStepJenkinsToolSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    model.setData("toolConfigId", selectedOption?._id);
    model.setData("toolName",selectedOption?.name);
    model.setData("toolJobName", "");
    model.setData("toolJobId", "");
    model.setData("jobType", "");
    model.setData("type", "");
    model.setData("gitToolId", "");
    model.setData("gitUrl", "");
    model.setData("sshUrl", "");
    model.setData("gitCredential", "");
    model.setData("repository", "");
    model.setData("repoId", "");
    model.setData("gitBranch", "");
    model.setData("workspace", "");
    model.setData("autoScaleEnable", selectedOption?.configuration?.autoScaleEnable || false);
    setModel({...model});
  };

  return (
     <RoleRestrictedJenkinsToolSelectInput
       fieldName={"toolConfigId"}
       configurationRequired={true}
       model={model}
       setModel={setModel}
       setDataFunction={setDataFunction}
       disabled={disabled}
     />
  );
}

CommandLineStepJenkinsToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CommandLineStepJenkinsToolSelectInput;