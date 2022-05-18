import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function GitToGitMergeSyncTaskRepositorySelectInput({
  model,
  setModel,
  disabled,
}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = { ...model };
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    const repoId = selectedOption?.id || selectedOption?.repositoryId || "";
    newModel.setData("projectId", repoId);
    newModel.setData("repoId", repoId);
    newModel.setData("repository", selectedOption?.name);
    newModel.setData("gitUrl", gitUrl);
    newModel.setDefaultValue("targetBranch");
    newModel.setDefaultValue("sourceBranch");
    newModel.setDefaultValue("upstreamBranch");
    newModel.setDefaultValue("isNewBranch");
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    const newModel = { ...model };
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("repoId");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("targetBranch");
    newModel.setDefaultValue("sourceBranch");
    newModel.setDefaultValue("upstreamBranch");
    newModel.setDefaultValue("isNewBranch");
    setModel({ ...newModel });
  };

  return (
    <RepositorySelectInput
      fieldName={"repository"}
      service={model?.getData("service")}
      gitToolId={model?.getData("toolId")}
      workspace={model?.getData("workspace")}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
      clearDataFunction={clearDataFunction}
    />
  );
}

GitToGitMergeSyncTaskRepositorySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GitToGitMergeSyncTaskRepositorySelectInput;
