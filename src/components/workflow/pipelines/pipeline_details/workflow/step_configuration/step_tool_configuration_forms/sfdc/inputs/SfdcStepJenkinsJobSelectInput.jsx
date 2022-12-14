import React from "react";
import PropTypes from "prop-types";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

function SfdcStepJenkinsJobSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("toolJobName", selectedOption.name);
    newDataObject.setData("toolJobType", selectedOption.type);
    newDataObject.setData("toolJobId", selectedOption._id);
    newDataObject.setData("jobType", selectedOption.configuration.jobType);
    newDataObject.setData("jobDescription", selectedOption.description);
    newDataObject.setData("buildType", selectedOption.configuration.buildType || "ant");
    newDataObject.setData("agentLabels", selectedOption.configuration?.agentLabels || "");
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData("toolJobName", "");
    newDataObject.setData("toolJobType", "");
    newDataObject.setData("toolJobId", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("jobDescription", "");
    newDataObject.setData("buildType", "");
    newDataObject.setData("agentLabels", "");
    setModel({...newDataObject});
  };

  // TODO : Type filter needs to be checked 
  return (
    <JenkinsRegistryToolJobSelectInput
      fieldName={"toolJobId"}
      jenkinsToolId={model?.getData("toolConfigId")}
      typeFilter={"SFDC"}
      configurationRequired={true}
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
