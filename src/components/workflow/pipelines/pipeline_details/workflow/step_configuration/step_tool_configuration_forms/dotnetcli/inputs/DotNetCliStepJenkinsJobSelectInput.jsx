import React from "react";
import PropTypes from "prop-types";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

function DotNetCliStepJenkinsJobSelectInput({dataObject, setDataObject, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("toolJobName", selectedOption.name);
    newDataObject.setData("toolJobId", selectedOption._id);
    newDataObject.setData("jobType", selectedOption.type[0]);
    newDataObject.setData("buildType", selectedOption.configuration.buildType);
    newDataObject.setData("buildTool", selectedOption.configuration.buildTool);
    newDataObject.setData("commandLineArgs", selectedOption.configuration.commandLineArgs);
    newDataObject.setData("agentLabels", selectedOption.configuration?.agentLabels || "");
    setDataObject({...newDataObject});
  };

  return (
    <JenkinsRegistryToolJobSelectInput
      fieldName={"toolJobId"}
      jenkinsToolId={dataObject?.getData("toolConfigId")}
      typeFilter={"BUILD"}
      configurationRequired={true}
      model={dataObject}
      setModel={setDataObject}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

DotNetCliStepJenkinsJobSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DotNetCliStepJenkinsJobSelectInput;