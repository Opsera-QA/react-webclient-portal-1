import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function JenkinsStepToolSelectInput({ model, setModel, disabled }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("toolConfigId", selectedOption._id);
    newDataObject.setData("jenkinsUrl", selectedOption?.configuration?.jenkinsUrl);
    newDataObject.setData("jUserId", selectedOption?.configuration?.jUserId);
    newDataObject.setData("jenkinsPort", selectedOption?.configuration?.jenkinsPort);
    newDataObject.setData("autoScaleEnable", selectedOption?.configuration?.autoScaleEnable);
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("service", "");
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("gitUserName", "");
    newDataObject.setData("repository", "");
    newDataObject?.setData("repositoryName", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("branch", "");
    newDataObject.setData("toolJobId", "");
    newDataObject.setData("toolJobType", "");
    newDataObject.setData("rollbackBranchName", "");
    newDataObject.setData("stepIdXML", "");
    newDataObject.setData("sfdcDestToolId", "");
    newDataObject.setData("destAccountUsername", "");
    newDataObject.setData("sfdcToolId", "");
    newDataObject.setData("accountUsername", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("defaultBranch", "");
    setModel({...newDataObject});
  };

  return (
    <RoleRestrictedJenkinsToolSelectInput
      fieldName={"toolConfigId"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

JenkinsStepToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default JenkinsStepToolSelectInput;
