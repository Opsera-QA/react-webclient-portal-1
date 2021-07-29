import React from "react";
import PropTypes from "prop-types";
import GitRepositoryInput from "components/common/list_of_values_input/tools/git/GitRepositoryInput";

function CoverityGitRepositoryInput({dataObject, setDataObject, disabled}) {
  const setRepository = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("repository", selectedOption.name);
    newDataObject.setData("repoId", selectedOption.id);
    newDataObject.setData("sshUrl", selectedOption.sshUrl || "");
    newDataObject.setData("gitUrl", selectedOption.httpUrl || "");
    setDataObject({...newDataObject});
  };

  return (
    <GitRepositoryInput
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