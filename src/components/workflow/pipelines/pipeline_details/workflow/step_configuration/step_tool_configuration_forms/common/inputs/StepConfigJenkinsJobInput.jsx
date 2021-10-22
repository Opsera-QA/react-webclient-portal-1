import React from "react";
import PropTypes from "prop-types";
import JenkinsJobSelectInput from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsJobSelectInput";

const StepConfigJenkinsJobInput = ({dataObject, setDataObject, disabled, typeFilter}) => {
    const setJenkinsJob = (fieldName, selectedOption) => {
        let newDataObject = {...dataObject};        
        newDataObject.setData("toolJobId", selectedOption._id);
        newDataObject.setData("toolJobName", selectedOption.name);
        newDataObject.setData("jobType", selectedOption.type[0]);        
        newDataObject.setData("toolJobType", selectedOption.type);
        if(selectedOption.configuration){
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

    const clearJenkinsJob = (fieldName) => {
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
        <JenkinsJobSelectInput
            fieldName={"toolJobName"}
            jenkinsId={dataObject?.getData("toolConfigId")}
            typeFilter={typeFilter}
            configurationRequired={true}
            dataObject={dataObject}
            setDataObject={setDataObject}
            setDataFunction={setJenkinsJob}
            clearDataFunction={clearJenkinsJob}
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