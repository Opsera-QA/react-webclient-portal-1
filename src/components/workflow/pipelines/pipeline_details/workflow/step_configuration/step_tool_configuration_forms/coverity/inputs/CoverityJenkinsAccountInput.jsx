import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsAccountSelectInput from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsAccountSelectInput";

function CoverityJenkinsAccountInput({dataObject, setDataObject, disabled, className}) {
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
    newDataObject.setData("repoId", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    setDataObject({...newDataObject});
  };

  return (
     <RoleRestrictedJenkinsAccountSelectInput
       fieldName={"gitCredential"}
       jenkinsToolId={dataObject?.getData("toolConfigId")}
       className={className}
       requireConfiguration={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setJenkinsAccount}
       disabled={disabled}
     />
  );
}

CoverityJenkinsAccountInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default CoverityJenkinsAccountInput;