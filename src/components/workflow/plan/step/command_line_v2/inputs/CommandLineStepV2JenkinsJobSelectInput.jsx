import React from "react";
import PropTypes from "prop-types";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

function CommandLineStepV2JenkinsJobSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    model.setData("toolJobName", selectedOption.name);
    model.setData("toolJobId", selectedOption._id);
    model.setData("jobType", selectedOption.type[0]);
    model.setData("agentLabels", selectedOption.configuration?.agentLabels || "");
    model.setData("buildType", selectedOption.configuration?.buildType || "");
    setModel({...model});
  };

  return (
    <JenkinsRegistryToolJobSelectInput
      fieldName={"toolJobId"}
      jenkinsToolId={model?.getData("toolConfigId")}
      typeFilter={"SHELL SCRIPT"}
      configurationRequired={true}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

CommandLineStepV2JenkinsJobSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CommandLineStepV2JenkinsJobSelectInput;