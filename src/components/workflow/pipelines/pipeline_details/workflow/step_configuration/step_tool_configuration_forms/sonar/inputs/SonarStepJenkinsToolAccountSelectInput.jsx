import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsAccountSelectInput from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsAccountSelectInput";

function SonarStepJenkinsToolAccountSelectInput({model, setModel, disabled, className}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("gitCredential", selectedOption.gitCredential);
    newDataObject.setData("gitToolId", selectedOption.toolId);
    newDataObject.setData("type", selectedOption.service);
    newDataObject.setData("service", selectedOption.service);
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
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
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default SonarStepJenkinsToolAccountSelectInput;