import React from "react";
import PropTypes from "prop-types";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

function JfrogDockerStepJenkinsJobSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("toolJobName", selectedOption.name);
    newDataObject.setData("toolJobId", selectedOption._id);
    newDataObject.setData("jobType", selectedOption.type[0]);
    newDataObject.setData("jobDescription", selectedOption.description);
    newDataObject.setData("toolJobType",  ["DOCKER PUSH"]);
    newDataObject.setData("agentLabels", selectedOption.configuration?.agentLabels || "");
    setModel({...newDataObject});
  };

  return (
    <JenkinsRegistryToolJobSelectInput
      fieldName={"toolJobId"}
      jenkinsToolId={model?.getData("toolConfigId")}
      typeFilter={"ARTIFACTORY_DOCKER_PUSH"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

JfrogDockerStepJenkinsJobSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default JfrogDockerStepJenkinsJobSelectInput;