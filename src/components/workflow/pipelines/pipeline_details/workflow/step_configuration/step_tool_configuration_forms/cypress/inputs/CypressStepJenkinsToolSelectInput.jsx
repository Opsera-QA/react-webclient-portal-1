import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function CypressStepJenkinsToolSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("toolConfigId", selectedOption?._id);
    newModel.setData("jenkinsUrl", selectedOption?.configuration?.jenkinsUrl);
    newModel.setData("jUserId", selectedOption?.configuration?.jUserId);
    newModel.setData("jenkinsPort", selectedOption?.configuration?.jenkinsPort);
    newModel.setData("jAuthToken", selectedOption?.configuration?.jAuthToken);
    newModel.setData("gitToolId", "");
    newModel.setData("repoId", "");
    newModel.setData("gitUrl", "");
    newModel.setData("sshUrl", "");
    newModel.setData("service", "");
    newModel.setData("gitCredential", "");
    newModel.setData("gitUserName", "");
    newModel.setData("workspace", "");
    newModel.setData("workspaceName", "");
    newModel.setData("repository", "");
    newModel.setData("branch", "");
    newModel.setData("toolJobId", "");
    newModel.setData("toolJobType", "");
    newModel.setData("accountUsername", "");
    newModel.setData("projectId", "");
    newModel.setData("defaultBranch", "");
    setModel({...newModel});
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

CypressStepJenkinsToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CypressStepJenkinsToolSelectInput;