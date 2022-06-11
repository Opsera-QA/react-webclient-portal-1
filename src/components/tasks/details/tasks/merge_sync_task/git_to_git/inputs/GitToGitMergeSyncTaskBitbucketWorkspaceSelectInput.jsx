import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function GitToGitMergeSyncTaskBitbucketWorkspaceSelectInput({
  model,
  setModel,
  disabled,
}) {
  const setWorkspace = (fieldName, selectedOption) => {
    const newModel = { ...model };
    newModel.setData("workspace", selectedOption?.key);
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("repoId");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("targetBranch");
    newModel.setDefaultValue("sourceBranch");
    newModel.setDefaultValue("upstreamBranch");
    newModel.setDefaultValue("isNewBranch");
    setModel({ ...newModel });
  };

  const clearData = () => {
    const newModel = { ...model };
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("repoId");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("targetBranch");
    newModel.setDefaultValue("sourceBranch");
    newModel.setDefaultValue("upstreamBranch");
    newModel.setDefaultValue("isNewBranch");
    setModel({ ...newModel });
  };

  if (model?.getData("service") !== "bitbucket") {
    return null;
  }

  return (
    <BitbucketWorkspaceInput
      fieldName={"workspace"}
      gitToolId={model?.getData("toolId")}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setWorkspace}
      disabled={disabled}
      clearDataFunction={clearData}
    />
  );
}

GitToGitMergeSyncTaskBitbucketWorkspaceSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GitToGitMergeSyncTaskBitbucketWorkspaceSelectInput;
