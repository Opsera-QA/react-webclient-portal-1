import React from "react";
import PropTypes from "prop-types";
import JenkinsAccountInput from "components/common/list_of_values_input/tools/jenkins/JenkinsAccountInput";

function CypressStepJenkinsAccountSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("gitToolId", selectedOption?.toolId);
    newModel.setData("gitCredential", selectedOption?.gitCredential);
    newModel.setData("gitUserName", selectedOption?.gitUserName);
    newModel.setData("service", selectedOption?.service);
    newModel.setData("repoId", "");
    newModel.setData("gitUrl", "");
    newModel.setData("sshUrl", "");
    newModel.setData("repository", "");
    newModel.setData("branch", "");
    newModel.setData("projectId", "");
    newModel.setData("defaultBranch", "");
    newModel.setData("workspace", "");
    newModel.setData("workspaceName", "");
    newModel.setData("gitBranch", "");
    setModel({...newModel});
  };

  return (
     <JenkinsAccountInput
       fieldName={"gitToolId"}
       jenkinsId={model?.getData("toolConfigId")}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setDataFunction}
       disabled={disabled}
     />
  );
}

CypressStepJenkinsAccountSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CypressStepJenkinsAccountSelectInput;