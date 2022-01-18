import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function SonarStepJenkinsToolSelectInput({fieldName, model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("toolConfigId", selectedOption?._id);
    newModel.setData("jenkinsUrl", selectedOption?.configuration?.jenkinsUrl);
    newModel.setData("jUserId", selectedOption?.configuration?.jUserId);
    newModel.setData("jenkinsPort", selectedOption?.configuration?.jenkinsPort);
    newModel.setDefaultValue("gitToolId");
    newModel.setDefaultValue("repoId");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("service");
    newModel.setDefaultValue("gitCredential");
    newModel.setDefaultValue("gitUserName");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("workspaceName");
    newModel.setDefaultValue("branch");
    newModel.setDefaultValue("toolJobId");
    newModel.setDefaultValue("toolJobType");
    newModel.setDefaultValue("accountUsername");
    newModel.setDefaultValue("projectId");
    newModel.setDefaultValue("defaultBranch");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedJenkinsToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

SonarStepJenkinsToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};

SonarStepJenkinsToolSelectInput.defaultProps = {
  fieldName: "toolConfigId",
};

export default SonarStepJenkinsToolSelectInput;