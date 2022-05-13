import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function BuildkiteGitRepositoryInput({dataObject, setDataObject, disabled}) {
  const setRepository = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    const repoId = selectedOption?._id || selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    const sshUrl = selectedOption?.sshUrl || selectedOption?.configuration?.sshUrl || "";

    newDataObject.setData("repository", selectedOption.name);
    newDataObject.setData("repoId", repoId);
    newDataObject.setData("projectId", repoId);
    newDataObject.setData("sshUrl", sshUrl);
    newDataObject.setData("gitUrl", gitUrl);
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
       disabled={disabled}
     />
  );
}

BuildkiteGitRepositoryInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BuildkiteGitRepositoryInput;