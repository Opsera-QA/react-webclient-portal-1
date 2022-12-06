import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function AnsibleStepGitRepositorySelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModelObject = {...model};
    const repoId = selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    const repoName = selectedOption?.nameSpacedPath || selectedOption?.name || "";
    newModelObject.setData("repositoryName", repoName);
    newModelObject.setData("repository", selectedOption.name);
    newModelObject.setData("repoId", repoId);
    newModelObject.setData("projectId", repoId);
    newModelObject.setData("sshUrl", selectedOption.sshUrl || "");
    newModelObject.setData("gitUrl", gitUrl);
    newModelObject.setData("defaultBranch", '');
    newModelObject.setData("gitBranch", '');
    setModel({...newModelObject});
  };
  const clearDataFunction=(fieldName)=>{
    let newModelObject = {...model};
    newModelObject.setData("repository", '');
    newModelObject.setData("repositoryName", '');
    newModelObject.setData("repoId", '');
    newModelObject.setData("projectId", '');
    newModelObject.setData("defaultBranch", '');
    newModelObject.setData("gitBranch", '');
    newModelObject.setData("sshUrl", '');
    newModelObject.setData("gitUrl", '');
    setModel({...newModelObject});
  };

  if(!model) {
    return null;
  }

  return (
     <RepositorySelectInput
       fieldName={"repositoryName"}
       service={model?.getData("service")}
       gitToolId={model?.getData("gitToolId")}
       workspace={model?.getData("workspace")}
       dataObject={model}
       setDataObject={setModel}
       clearDataFunction={clearDataFunction}
       setDataFunction={setDataFunction}
       disabled={disabled}
     />
  );
}

AnsibleStepGitRepositorySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default AnsibleStepGitRepositorySelectInput;