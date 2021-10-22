import React from "react";
import PropTypes from "prop-types";
import JenkinsJobSelectInput from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsJobSelectInput";

function PowershellJenkinsJobInput({dataObject, setDataObject, disabled}) {
  const setJenkinsJob = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("toolJobName", selectedOption.name);
    newDataObject.setData("toolJobId", selectedOption._id);
    newDataObject.setData("jobType", selectedOption.type[0]);
    newDataObject.setData("agentLabels", selectedOption.configuration?.agentLabels || "");
    setDataObject({...newDataObject});
  };

  return (
     <JenkinsJobSelectInput
       fieldName={"toolJobName"}
       jenkinsId={dataObject?.getData("toolConfigId")}
       typeFilter={"POWERSHELL SCRIPT"}
       configurationRequired={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setJenkinsJob}
       disabled={disabled}
     />
  );
}

PowershellJenkinsJobInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PowershellJenkinsJobInput;