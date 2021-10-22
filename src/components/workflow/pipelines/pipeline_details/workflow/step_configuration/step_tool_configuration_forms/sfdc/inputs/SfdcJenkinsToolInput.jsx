import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function SfdcJenkinsToolInput({dataObject, setDataObject, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {

    let newDataObject = {...dataObject};
    newDataObject.setData("toolConfigId", selectedOption?._id);
    newDataObject.setData("toolName",selectedOption?.name);
    // newDataObject.setData("jenkinsUrl", selectedOption?.configuration?.jenkinsUrl);
    // newDataObject.setData("jenkinsPort", selectedOption?.configuration?.jenkinsPort);
    // newDataObject.setData("jUserId", selectedOption?.configuration?.jUserId);
    // newDataObject.setData("jAuthToken", selectedOption?.configuration?.jAuthToken);    
    newDataObject.setData("toolJobName", "");
    newDataObject.setData("toolJobId", "");
    newDataObject.setData("jobType", "");    
    // newDataObject.setData("type", "");
    newDataObject.setData("service", "");
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("sfdcDestToolId", "");
    newDataObject.setData("destAccountUsername", "");
    newDataObject.setData("sfdcUnitTestType", "");
    newDataObject.setData("workspaceDeleteFlag", false);
    newDataObject.setData("autoScaleEnable", selectedOption.configuration.autoScaleEnable || false);
    setDataObject({...newDataObject});
  };

  return (
     <RoleRestrictedJenkinsToolSelectInput
       fieldName={"toolConfigId"}
       model={dataObject}
       setModel={setDataObject}
       setDataFunction={setDataFunction}
       disabled={disabled}
     />
  );
}

SfdcJenkinsToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SfdcJenkinsToolInput;
