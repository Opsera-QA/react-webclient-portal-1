import React from "react";
import PropTypes from "prop-types";
import JenkinsJobInput from "components/common/list_of_values_input/tools/jenkins/JenkinsJobInput";

function DotNetJenkinsJobInput({dataObject, setDataObject, disabled}) {
  const setJenkinsJob = (fieldName, selectedOption) => {
    console.log(selectedOption)
    let newDataObject = {...dataObject};
    newDataObject.setData("toolJobName", selectedOption.name);
    newDataObject.setData("toolJobId", selectedOption._id);
    newDataObject.setData("jobType", selectedOption.type[0]);
    newDataObject.setData("buildType", selectedOption.configuration.buildType);
    newDataObject.setData("buildTool", selectedOption.configuration.buildTool);
    newDataObject.setData("commandLineArgs", selectedOption.configuration.commandLineArgs);
    newDataObject.setData("agentLabels", selectedOption.configuration?.agentLabels || "");
    newDataObject.setData("jobName", "");
    setDataObject({...newDataObject});
  };

  return (
     <JenkinsJobInput
       fieldName={"toolJobName"}
       jenkinsId={dataObject?.getData("toolConfigId")}
       typeFilter={"BUILD"}
       configurationRequired={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setJenkinsJob}
       disabled={disabled}
     />
  );
}

DotNetJenkinsJobInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DotNetJenkinsJobInput;