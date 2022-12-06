import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

// TODO: There should be a base component. Each step form should be only setting the relevant fields
//  instead of setting all of these fields for every instance of the dropdown.
function StepConfigJenkinsToolInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("jobType", "");
    newModel.setData("toolConfigId", selectedOption?._id);
    newModel.setData("jenkinsUrl", selectedOption?.configuration?.jenkinsUrl);
    newModel.setData("jenkinsPort", selectedOption?.configuration?.jenkinsPort);
    newModel.setData("jUserId", selectedOption?.configuration?.jUserId);
    newModel.setData("jAuthToken", selectedOption?.configuration?.jAuthToken);
    newModel.setData("toolJobId", "");
    newModel.setData("toolJobType", "");
    newModel.setData("accountUsername", "");
    newModel.setData("projectId", "");
    newModel.setData("defaultBranch", "");
    newModel.setData("dockerName", "");
    newModel.setData("dockerTagName", "");
    // newModel.setData("buildType", "gradle");
    newModel.setData("gitToolId", "");
    newModel.setData("repoId", "");
    newModel.setData("gitUrl", "");
    newModel.setData("sshUrl", "");
    newModel.setData("service", "");
    newModel.setData("gitCredential", "");
    newModel.setData("gitUserName", "");
    newModel.setData("repository", "");
    newModel?.setData("repositoryName", "");
    newModel.setData("branch", "");
    newModel.setData("gitBranch", "");
    newModel.setData("workspace", "");
    newModel.setData("workspaceName", "");
    newModel.setData("workspaceDeleteFlag", false);
    newModel.setData("jobDescription", "");
    // newModel.setData("buildTool", "gradle");
    // newModel.setData("gradleTask", "clean test");
    // newModel.setData("mavenTask", "");
    newModel.setData("stepIdXML", "");
    newModel.setData("toolJobName", "");
    newModel.setData("autoScaleEnable", selectedOption?.configuration?.autoScaleEnable === true);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData("jobType", "");
    newModel.setData("toolConfigId", "");
    newModel.setData("jenkinsUrl", "");
    newModel.setData("jenkinsPort", "");
    newModel.setData("jUserId", "");
    newModel.setData("jAuthToken", "");
    newModel.setData("toolJobId", "");
    newModel.setData("toolJobType", "");
    newModel.setData("accountUsername", "");
    newModel.setData("projectId", "");
    newModel.setData("defaultBranch", "");
    newModel.setData("dockerName", "");
    newModel.setData("dockerTagName", "");
    newModel.setData("gitToolId", "");
    newModel.setData("repoId", "");
    newModel.setData("gitUrl", "");
    newModel.setData("sshUrl", "");
    newModel.setData("service", "");
    newModel.setData("gitCredential", "");
    newModel.setData("gitUserName", "");
    newModel.setData("repository", "");
    newModel?.setData("repositoryName", "");
    newModel.setData("branch", "");
    newModel.setData("gitBranch", "");
    newModel.setData("workspace", "");
    newModel.setData("workspaceName", "");
    newModel.setData("workspaceDeleteFlag", false);
    newModel.setData("jobDescription", "");
    newModel.setData("stepIdXML", "");
    newModel.setData("toolJobName", "");
    newModel.setData("autoScaleEnable", false);
    setModel({...newModel});
  };

  return (
    <RoleRestrictedJenkinsToolSelectInput
      fieldName={"toolConfigId"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
}

StepConfigJenkinsToolInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default StepConfigJenkinsToolInput;