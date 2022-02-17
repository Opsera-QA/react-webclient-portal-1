import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function GitToGitSyncTaskRepositorySelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    const repoId = selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    newDataObject.setData("repository", selectedOption?.name);
    newDataObject.setData("projectId", repoId);
    newDataObject.setData("repoId", repoId);
    newDataObject.setData("sshUrl", selectedOption?.sshUrl);
    newDataObject.setData("gitUrl", gitUrl);
    newDataObject.setData("branch", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("sourceBranch", "");
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData("repository", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("branch", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("sourceBranch", "");
    setModel({...newDataObject});
  };

  return (
     <RepositorySelectInput
       fieldName={"repository"}
       service={model?.getData("service")}
       gitToolId={model?.getData("gitToolId")}
       workspace={model?.getData("workspace")}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setDataFunction}
       disabled={disabled}
       clearDataFunction={clearDataFunction}
     />
  );
}

GitToGitSyncTaskRepositorySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GitToGitSyncTaskRepositorySelectInput;
