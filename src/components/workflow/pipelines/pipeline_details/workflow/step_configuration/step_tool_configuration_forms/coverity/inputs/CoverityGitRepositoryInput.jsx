import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function CoverityGitRepositoryInput({dataObject, setDataObject, disabled}) {
  const setRepository = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    const repoId = selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    newDataObject.setData("repository", selectedOption.name);
    newDataObject.setData("repoId", repoId);
    newDataObject.setData("sshUrl", selectedOption.sshUrl || "");
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

CoverityGitRepositoryInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CoverityGitRepositoryInput;