import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function NexusStepJenkinsToolSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("toolConfigId", selectedOption?._id);
    newModel.setData("toolName", selectedOption?.name);
    newModel.setData("jobType", "NEXUS_DOCKER_PUSH");
    newModel.setData("jobDescription", "");
    newModel.setData("toolJobType", ["DOCKER PUSH"]);
    newModel.setData("agentLabels", "generic-linux");
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

NexusStepJenkinsToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default NexusStepJenkinsToolSelectInput;