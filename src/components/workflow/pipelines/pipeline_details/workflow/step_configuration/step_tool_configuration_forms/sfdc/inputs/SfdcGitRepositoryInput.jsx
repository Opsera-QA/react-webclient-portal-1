import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function SfdcGitRepositoryInput({dataObject, setDataObject, disabled}) {
  const setRepository = (fieldName, selectedOption) => {

    let newDataObject = {...dataObject};
    newDataObject.setData("repository", selectedOption.name);
    newDataObject.setData("projectId", selectedOption.id);
    newDataObject.setData("repoId", selectedOption.id);
    newDataObject.setData("sshUrl", selectedOption.sshUrl);
    newDataObject.setData("gitUrl", selectedOption.httpUrl);
    newDataObject.setData("branch", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("sourceBranch", "");
    setDataObject({...newDataObject});
  };

  const clearData = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("repository", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("branch", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("sourceBranch", "");
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
       clearDataFunction={clearData}
     />
  );
}

SfdcGitRepositoryInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SfdcGitRepositoryInput;
