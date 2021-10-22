import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function PowershellStepJenkinsToolSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("toolConfigId", selectedOption?._id);
    newModel.setData("toolName", selectedOption?.name);
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

  return (
    <RoleRestrictedJenkinsToolSelectInput
      fieldName={"toolConfigId"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

PowershellStepJenkinsToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PowershellStepJenkinsToolSelectInput;