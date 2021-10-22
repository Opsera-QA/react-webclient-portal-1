import React from "react";
import PropTypes from "prop-types";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

function DotNetStepJenkinsJobSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("toolJobName", selectedOption.name);
    newDataObject.setData("toolJobId", selectedOption._id);
    newDataObject.setData("jobType", selectedOption.type[0]);
    newDataObject.setData("buildType", selectedOption.configuration.buildType);
    newDataObject.setData("buildTool", selectedOption.configuration.buildTool);
    newDataObject.setData("commandLineArgs", selectedOption.configuration.commandLineArgs);
    newDataObject.setData("agentLabels", selectedOption.configuration?.agentLabels || "");
    setModel({...newDataObject});
  };

  return (
    <JenkinsRegistryToolJobSelectInput
      fieldName={"toolJobId"}
      jenkinsToolId={model?.getData("toolConfigId")}
      typeFilter={"BUILD"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

DotNetStepJenkinsJobSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DotNetStepJenkinsJobSelectInput;