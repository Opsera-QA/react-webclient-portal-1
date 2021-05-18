import React from "react";
import PropTypes from "prop-types";
import JenkinsJobInput from "components/common/list_of_values_input/tools/jenkins/JenkinsJobInput";

function DockerPushJenkinsJobInput({dataObject, setDataObject, disabled}) {
  const setJenkinsJob = (fieldName, selectedOption) => {    
    let newDataObject = {...dataObject};
    newDataObject.setData("toolJobName", selectedOption.name);
    newDataObject.setData("toolJobId", selectedOption._id);
    newDataObject.setData("jobType", selectedOption.type[0]);
    newDataObject.setData("buildType", selectedOption.configuration?.buildType || "docker");
    newDataObject.setData("jobName", "");
    newDataObject.setData("agentLabels", selectedOption.configuration?.agentLabels || "");    
    setDataObject({...newDataObject});
  };
  const clearDataFunction = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("toolJobName", "");
    newDataObject.setData("toolJobId", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("buildType", "docker");
    newDataObject.setData("jobName", "");
    newDataObject.setData("agentLabels", "");    
    setDataObject({...newDataObject});
  };
  return (
     <JenkinsJobInput
       fieldName={"toolJobName"}
       jenkinsId={dataObject?.getData("toolConfigId")}
       typeFilter={"DOCKER PUSH"}
       configurationRequired={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       clearDataFunction={clearDataFunction}
       setDataFunction={setJenkinsJob}
       disabled={disabled}
     />
  );
}

DockerPushJenkinsJobInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DockerPushJenkinsJobInput;