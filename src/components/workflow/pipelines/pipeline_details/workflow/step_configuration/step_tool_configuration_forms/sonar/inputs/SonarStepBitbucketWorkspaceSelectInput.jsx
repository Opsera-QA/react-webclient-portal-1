import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function SonarStepBitbucketWorkspaceSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setData("workspace", selectedOption?.key);
    newModel.setData("workspaceName", selectedOption?.name);
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("repoId");
    newModel.setDefaultValue("projectId");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("branch");
    newModel.setDefaultValue("defaultBranch");
    newModel.setDefaultValue("gitBranch");
    setModel({...newModel});
  };

  if (model?.getData("service") !== "bitbucket") {
    return null;
  }

  return (
    <BitbucketWorkspaceInput
      fieldName={"workspaceName"}
      gitToolId={model?.getData("gitToolId")}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

SonarStepBitbucketWorkspaceSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SonarStepBitbucketWorkspaceSelectInput;