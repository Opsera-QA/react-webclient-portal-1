import React from "react";
import PropTypes from "prop-types";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

// TODO: This shouldn't be used. We should be using context-specific inputs to not set invalid object properties.
const StepConfigJenkinsJobInput = ({dataObject, setDataObject, disabled, typeFilter}) => {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("toolJobId", selectedOption._id);
    newDataObject.setData("toolJobName", selectedOption.name);
    newDataObject.setData("jobType", selectedOption.type[0]);
    newDataObject.setData("toolJobType", selectedOption.type);
    if (selectedOption?.configuration) {
      Object.keys(selectedOption.configuration).forEach(key => {
        newDataObject.setData(key, selectedOption.configuration[key]);
      });
    }
    newDataObject.setData("buildToolVersion", "6.3");
    newDataObject.setData("projectKey", "");
    newDataObject.setData("buildArgs", {});
    newDataObject.setData("agentLabels", selectedOption.configuration?.agentLabels || "");
    setDataObject({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("toolJobId", "");
    newDataObject.setData("toolJobName", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("toolJobType", "");
    newDataObject.setData("buildToolVersion", "6.3");
    newDataObject.setData("projectKey", "");
    newDataObject.setData("buildArgs", {});
    newDataObject.setData("agentLabels", "");
    setDataObject({...newDataObject});
  };

  return (
    <JenkinsRegistryToolJobSelectInput
      fieldName={"toolJobName"}
      jenkinsToolId={dataObject?.getData("toolConfigId")}
      typeFilter={typeFilter}
      configurationRequired={true}
      model={dataObject}
      setModel={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
};

StepConfigJenkinsJobInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  typeFilter: PropTypes.any
};

export default StepConfigJenkinsJobInput;