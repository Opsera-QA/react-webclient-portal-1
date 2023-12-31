import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function ArgoGitRepositoryInput({dataObject, setDataObject, disabled}) {
  const setRepository = (fieldName, selectedOption) => {

    let newDataObject = {...dataObject};
    const repoId = selectedOption?._id || selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    const sshUrl = selectedOption?.sshUrl || selectedOption?.configuration?.sshUrl || "";
    newDataObject.setData("repositoryName", selectedOption.name);
    newDataObject.setData("projectId", repoId);
    newDataObject.setData("repoId", repoId);
    newDataObject.setData("sshUrl", sshUrl);
    newDataObject.setData("httpsUrl", gitUrl);
    setDataObject({...newDataObject});
  };

  const clearData = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("repositoryName", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("httpsUrl", "");
    setDataObject({...newDataObject});
  };

  return (
     <RepositorySelectInput
       fieldName={"projectId"}
       service={dataObject.getData("service")}
       gitToolId={dataObject.getData("gitToolId")}
       workspace={dataObject.getData("workspace")}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setRepository}
       disabled={disabled}
       clearDataFunction={clearData}
     />
  );
}

ArgoGitRepositoryInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ArgoGitRepositoryInput;
