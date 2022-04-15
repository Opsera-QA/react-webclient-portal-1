import React from "react";
import PropTypes from "prop-types";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

function CoverityStepJenkinsJobSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("toolJobId", selectedOption._id);
    newDataObject.setData("agentLabels", selectedOption.configuration?.agentLabels || "");
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData("toolJobId", "");
    newDataObject.setData("agentLabels", "");
    setModel({...newDataObject});
  };

  return (
    <JenkinsRegistryToolJobSelectInput
      fieldName={"toolJobId"}
      jenkinsToolId={model?.getData("toolConfigId")}
      typeFilter={"COVERITY"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
}

CoverityStepJenkinsJobSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CoverityStepJenkinsJobSelectInput;