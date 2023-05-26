import React from "react";
import PropTypes from "prop-types";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

function CommandLineStepJenkinsJobSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("toolJobName", selectedOption.name);
    newModel.setData("toolJobId", selectedOption._id);
    newModel.setData("jobType", selectedOption.type[0]);
    newModel.setData("agentLabels", selectedOption.configuration?.agentLabels || "");    
    newModel.setData("buildType", selectedOption.configuration?.buildType || "");
    setModel({...newModel});
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

CommandLineStepJenkinsJobSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CommandLineStepJenkinsJobSelectInput;