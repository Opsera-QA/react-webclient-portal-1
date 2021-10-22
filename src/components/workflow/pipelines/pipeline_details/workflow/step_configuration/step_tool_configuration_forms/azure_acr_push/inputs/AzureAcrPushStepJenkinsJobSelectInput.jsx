import React from "react";
import PropTypes from "prop-types";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

function AzureAcrPushStepJenkinsJobSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("toolJobName", selectedOption.name);
    newModel.setData("toolJobId", selectedOption._id);
    newModel.setData("jobType", selectedOption.type[0]);   
    newModel.setData("buildType", selectedOption.configuration?.buildType || "docker");
    newModel.setData("agentLabels", selectedOption.configuration?.agentLabels || "");
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData("toolJobName", "");
    newModel.setData("toolJobId", "");
    newModel.setData("jobType", "");
    newModel.setData("buildType", "docker");
    newModel.setData("agentLabels", "");
    setModel({...newModel});
  };
  
  return (
    <JenkinsRegistryToolJobSelectInput
      fieldName={"toolJobId"}
      jenkinsToolId={model?.getData("toolConfigId")}
      typeFilter={"AZURE_DOCKER_PUSH"}
      model={model}
      setModel={setModel}
      clearDataFunction={clearDataFunction}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

AzureAcrPushStepJenkinsJobSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default AzureAcrPushStepJenkinsJobSelectInput;