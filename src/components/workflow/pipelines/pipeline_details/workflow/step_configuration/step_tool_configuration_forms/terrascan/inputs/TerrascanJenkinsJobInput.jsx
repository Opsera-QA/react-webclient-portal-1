import React from "react";
import PropTypes from "prop-types";
import JenkinsJobInput from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsJobInput";

function TerrascanJenkinsJobInput({dataObject, setDataObject, disabled}) {
  const setJenkinsJob = (fieldName, selectedOption) => {    
    let newDataObject = {...dataObject};
    newDataObject.setData("toolJobName", selectedOption.name);
    newDataObject.setData("toolJobId", selectedOption._id);
    newDataObject.setData("jobType", selectedOption.type[0]);
    newDataObject.setData("agentLabels", selectedOption.configuration?.agentLabels || "");    
    setDataObject({...newDataObject});
  };

  return (
     <JenkinsJobInput
       fieldName={"toolJobName"}
       jenkinsId={dataObject?.getData("toolConfigId")}
       typeFilter={"SHELL SCRIPT"}
       configurationRequired={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setJenkinsJob}
       disabled={disabled}
     />
  );
}

TerrascanJenkinsJobInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerrascanJenkinsJobInput;