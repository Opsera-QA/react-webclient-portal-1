import React from "react";
import PropTypes from "prop-types";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

function SfdcStepJenkinsJobSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("toolJobName", selectedOption?.name);
    newModel.setData("toolJobType", selectedOption?.type);
    newModel.setData("toolJobId", selectedOption?._id);
    newModel.setData("jobType", selectedOption?.configuration?.jobType);
    newModel.setData("jobDescription", selectedOption?.description);
    newModel.setData("buildType", selectedOption?.configuration?.buildType || "ant");
    newModel.setData("agentLabels", selectedOption?.configuration?.agentLabels || "");
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData("toolJobName", "");
    newModel.setData("toolJobType", "");
    newModel.setData("toolJobId", "");
    newModel.setData("jobType", "");
    newModel.setData("jobDescription", "");
    newModel.setData("buildType", "");
    newModel.setData("agentLabels", "");
    setModel({...newModel});
  };

  return (
    <JenkinsRegistryToolJobSelectInput
      fieldName={"toolJobId"}
      jenkinsToolId={model?.getData("toolConfigId")}
      typeFilter={"SFDC"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
      clearDataFunction={clearDataFunction}
    />
  );
}

SfdcStepJenkinsJobSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SfdcStepJenkinsJobSelectInput;
