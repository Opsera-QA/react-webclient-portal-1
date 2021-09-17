import React from "react";
import PropTypes from "prop-types";
import GitRepositoryInput from "components/common/list_of_values_input/tools/git/GitRepositoryInput";

function ArgoGitRepositoryInput({dataObject, setDataObject, disabled}) {
  const setRepository = (fieldName, selectedOption) => {

    let newDataObject = {...dataObject};
    newDataObject.setData("repositoryName", selectedOption.name);
    newDataObject.setData("projectId", selectedOption.id);
    newDataObject.setData("repoId", selectedOption.id);
    newDataObject.setData("sshUrl", selectedOption.sshUrl);
    newDataObject.setData("httpsUrl", selectedOption.httpUrl);
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
     <GitRepositoryInput
       fieldName={"repositoryName"}
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
