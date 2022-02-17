import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function StepConfigGitRepositoryInput({dataObject, setDataObject, disabled}) {
  const setRepository = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    const repoId = selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    newDataObject.setData("repository", selectedOption.name);
    newDataObject.setData("repoId", repoId);
    newDataObject.setData("projectId", repoId);
    newDataObject.setData("sshUrl", selectedOption.sshUrl || "");
    newDataObject.setData("gitUrl", gitUrl);
    newDataObject.setData("branch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitBranch", "");
    setDataObject({...newDataObject});
  };

  const clearRepository = (fieldName) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("repository", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("branch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitBranch", "");
    setDataObject({...newDataObject});
  };

  return (
     <RepositorySelectInput
       fieldName={"repository"}
       service={dataObject.getData("service")}
       gitToolId={dataObject.getData("gitToolId")}
       workspace={dataObject.getData("workspace")}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setRepository}
       clearDataFunction={clearRepository}
       disabled={disabled}
     />
  );
}

StepConfigGitRepositoryInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default StepConfigGitRepositoryInput;