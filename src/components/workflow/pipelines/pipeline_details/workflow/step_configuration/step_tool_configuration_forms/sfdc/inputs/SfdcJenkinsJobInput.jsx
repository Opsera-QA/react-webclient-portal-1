import React from "react";
import PropTypes from "prop-types";
import JenkinsJobInput from "components/common/list_of_values_input/tools/jenkins/JenkinsJobInput";

function SfdcJenkinsJobInput({dataObject, setDataObject, disabled}) {
  const setJenkinsJob = (fieldName, selectedOption) => {    

    let newDataObject = {...dataObject};
    newDataObject.setData("toolJobName", selectedOption.name);
    newDataObject.setData("toolJobType", selectedOption.type);
    newDataObject.setData("toolJobId", selectedOption._id);
    newDataObject.setData("jobType", selectedOption.configuration.jobType);
    newDataObject.setData("jobName", "");
    newDataObject.setData("jobDescription", selectedOption.description);
    newDataObject.setData("buildType", selectedOption.configuration.buildType || "ant");
    newDataObject.setData("agentLabels", selectedOption.configuration?.agentLabels || "");
    setDataObject({...newDataObject});
  };

  const clearData = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("toolJobName", "");
    newDataObject.setData("toolJobType", "");
    newDataObject.setData("toolJobId", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("jobName", "");
    newDataObject.setData("jobDescription", "");
    newDataObject.setData("buildType", "");
    newDataObject.setData("agentLabels", "");
    setDataObject({...newDataObject});
  };

  // TODO : Type filter needs to be checked 
  return (
     <JenkinsJobInput
       fieldName={"toolJobName"}
       jenkinsId={dataObject?.getData("toolConfigId")}
       typeFilter={"SFDC"}
       configurationRequired={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setJenkinsJob}
       disabled={disabled}
       clearDataFunction={clearData}
     />
  );
}

SfdcJenkinsJobInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SfdcJenkinsJobInput;
