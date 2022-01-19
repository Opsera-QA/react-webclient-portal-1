import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsAccountSelectInput from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsAccountSelectInput";

function SonarStepJenkinsToolAccountSelectInput({model, setModel, disabled, className}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newDataObject = {...model};
    newDataObject.setData("gitToolId", selectedOption?.toolId);
    newDataObject.setData("gitCredential", selectedOption?.gitCredential);
    newDataObject.setData("gitUserName", selectedOption?.gitUserName);
    newDataObject.setData("service", selectedOption?.service);
    newDataObject.setDefaultValue("repoId");
    newDataObject.setDefaultValue("gitUrl");
    newDataObject.setDefaultValue("sshUrl");
    newDataObject.setDefaultValue("repository");
    newDataObject.setDefaultValue("workspace");
    newDataObject.setDefaultValue("workspaceName");
    newDataObject.setDefaultValue("branch");
    newDataObject.setDefaultValue("projectId");
    newDataObject.setDefaultValue("defaultBranch");
    setModel({...newDataObject});
  };

  return (
    <RoleRestrictedJenkinsAccountSelectInput
      fieldName={"gitCredential"}
      jenkinsToolId={model?.getData("toolConfigId")}
      className={className}
      requireConfiguration={true}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled || model?.getData("toolJobId") === ""}
    />
  );
}

SonarStepJenkinsToolAccountSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default SonarStepJenkinsToolAccountSelectInput;