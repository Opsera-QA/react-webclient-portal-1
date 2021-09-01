import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function StepConfigJenkinsToolInput({dataObject, setDataObject, disabled}) {

    const setJenkinsTool = (fieldName, selectedOption) => {

        let newDataObject = {...dataObject};
        newDataObject.setData("jobType", "");
        newDataObject.setData("toolConfigId", selectedOption.id);
        newDataObject.setData("jenkinsUrl", selectedOption.configuration.jenkinsUrl);
        newDataObject.setData("jenkinsPort", selectedOption.configuration.jenkinsPort);
        newDataObject.setData("jUserId", selectedOption.configuration.jUserId);
        newDataObject.setData("jAuthToken", selectedOption.configuration.jAuthToken);
        newDataObject.setData("toolJobId", "");
        newDataObject.setData("toolJobType", "");
        newDataObject.setData("accountUsername", "");
        newDataObject.setData("projectId", "");
        newDataObject.setData("defaultBranch", "");
        newDataObject.setData("dockerName", "");
        newDataObject.setData("dockerTagName", "");
        // newDataObject.setData("buildType", "gradle");
        newDataObject.setData("gitToolId", "");
        newDataObject.setData("repoId", "");
        newDataObject.setData("gitUrl", "");
        newDataObject.setData("sshUrl", "");
        newDataObject.setData("service", "");
        newDataObject.setData("gitCredential", "");
        newDataObject.setData("gitUserName", "");    
        newDataObject.setData("repository", "");
        newDataObject.setData("branch", "");
        newDataObject.setData("gitBranch", "");
        newDataObject.setData("workspace", "");
        newDataObject.setData("workspaceName", "");
        newDataObject.setData("workspaceDeleteFlag", false);
        newDataObject.setData("jobDescription", "");
        // newDataObject.setData("buildTool", "gradle");
        // newDataObject.setData("gradleTask", "clean test");
        // newDataObject.setData("mavenTask", "");
        newDataObject.setData("stepIdXML", "");
        newDataObject.setData("toolJobName", "");
        newDataObject.setData("autoScaleEnable", selectedOption.configuration.autoScaleEnable || false);
        setDataObject({...newDataObject});
    };

    const clearJenkinsTool = (fieldName) => {

        let newDataObject = {...dataObject};
        newDataObject.setData("jobType", "");
        newDataObject.setData("toolConfigId", "");
        newDataObject.setData("jenkinsUrl", "");
        newDataObject.setData("jenkinsPort", "");
        newDataObject.setData("jUserId", "");
        newDataObject.setData("jAuthToken", "");
        newDataObject.setData("toolJobId", "");
        newDataObject.setData("toolJobType", "");
        newDataObject.setData("accountUsername", "");
        newDataObject.setData("projectId", "");
        newDataObject.setData("defaultBranch", "");
        newDataObject.setData("dockerName", "");
        newDataObject.setData("dockerTagName", "");
        newDataObject.setData("gitToolId", "");
        newDataObject.setData("repoId", "");
        newDataObject.setData("gitUrl", "");
        newDataObject.setData("sshUrl", "");
        newDataObject.setData("service", "");
        newDataObject.setData("gitCredential", "");
        newDataObject.setData("gitUserName", "");    
        newDataObject.setData("repository", "");
        newDataObject.setData("branch", "");
        newDataObject.setData("gitBranch", "");
        newDataObject.setData("workspace", "");
        newDataObject.setData("workspaceName", "");
        newDataObject.setData("workspaceDeleteFlag", false);
        newDataObject.setData("jobDescription", "");        
        newDataObject.setData("stepIdXML", "");
        newDataObject.setData("toolJobName", "");
        newDataObject.setData("autoScaleEnable", false);
        setDataObject({...newDataObject});
    };


    return (
        <PipelineToolInput
            toolType={"jenkins"}
            toolFriendlyName={"Jenkins"}
            fieldName={"toolConfigId"}
            configurationRequired={true}
            dataObject={dataObject}
            setDataObject={setDataObject}
            setDataFunction={setJenkinsTool}
            clearDataFunction={clearJenkinsTool}
            disabled={disabled}
        />
    );
}

StepConfigJenkinsToolInput.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
};

export default StepConfigJenkinsToolInput;