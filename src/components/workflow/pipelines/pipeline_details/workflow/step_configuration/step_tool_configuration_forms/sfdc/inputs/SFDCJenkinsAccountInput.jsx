import React from "react";
import PropTypes from "prop-types";
import JenkinsAccountInput from "components/common/list_of_values_input/tools/jenkins/JenkinsAccountInput";

function SFDCJenkinsAccountInput({dataObject, setDataObject, disabled}) {
  const setJenkinsAccount = (fieldName, selectedOption) => {

    let newDataObject = {...dataObject};
    newDataObject.setData("gitCredential", selectedOption.gitCredential);
    newDataObject.setData("gitToolId", selectedOption.toolId);
    newDataObject.setData("type", selectedOption.service);
    newDataObject.setData("service", selectedOption.service);
    newDataObject.setData("gitUserName", selectedOption.gitUserName);
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("workspace", "");
    setDataObject({...newDataObject});
  };

  const clearData = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("gitToolId", "");
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

SFDCJenkinsAccountInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SFDCJenkinsAccountInput;
