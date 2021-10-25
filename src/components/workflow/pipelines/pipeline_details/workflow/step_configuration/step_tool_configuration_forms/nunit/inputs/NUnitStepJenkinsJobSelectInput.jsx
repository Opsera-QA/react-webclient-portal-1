import React from "react";
import PropTypes from "prop-types";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

function NUnitStepJenkinsJobSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("toolJobName", selectedOption?.name);
    newModel.setData("toolJobId", selectedOption?._id);
    newModel.setData("jobType", selectedOption?.type[0]);
    newModel.setData("agentLabels", selectedOption?.configuration?.agentLabels || "");
    setModel({...newModel});
  };

  return (
    <JenkinsRegistryToolJobSelectInput
      fieldName={"toolJobName"}
      jenkinsToolId={model?.getData("toolConfigId")}
      typeFilter={"NUNIT_UNIT_TESTING"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

NUnitStepJenkinsJobSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default NUnitStepJenkinsJobSelectInput;