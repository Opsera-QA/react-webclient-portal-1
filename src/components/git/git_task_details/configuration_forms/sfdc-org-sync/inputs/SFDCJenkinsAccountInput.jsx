import React from "react";
import PropTypes from "prop-types";
import JenkinsAccountInput from "components/common/list_of_values_input/tools/jenkins/JenkinsAccountInput";

function SfdcJenkinsAccountInput({dataObject, setDataObject, gitTasksDataDto, disabled}) {
  const setJenkinsAccount = (fieldName, selectedOption) => {

    let newDataObject = {...dataObject};
    newDataObject.setData("gitCredential", selectedOption.gitCredential);
    newDataObject.setData("gitToolId", selectedOption.toolId);
    newDataObject.setData("service", selectedOption.service);
    // save the tool identifier to the parent obj
    gitTasksDataDto.setData("tool_identifier", selectedOption.service);
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("branch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("sourceBranch", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    setDataObject({...newDataObject});
  };

  const clearData = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("gitToolId", "");
    gitTasksDataDto.setData("tool_identifier", "");
    newDataObject.setData("type", "");
    newDataObject.setData("service", "");
    newDataObject.setData("gitUserName", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("workspace", "");
    setDataObject({...newDataObject});
  };

  return (
     <JenkinsAccountInput
       fieldName={"gitCredential"}
       jenkinsId={dataObject?.getData("toolConfigId")}
       requireConfiguration={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setJenkinsAccount}
       disabled={disabled}
       clearDataFunction={clearData}
     />
  );
}

SfdcJenkinsAccountInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  gitTasksDataDto: PropTypes.object,
};

export default SfdcJenkinsAccountInput;
