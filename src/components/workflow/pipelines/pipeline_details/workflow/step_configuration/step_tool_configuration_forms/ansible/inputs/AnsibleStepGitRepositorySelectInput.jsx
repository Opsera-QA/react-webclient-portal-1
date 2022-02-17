import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function AnsibleStepGitRepositorySelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModelObject = {...model};
    const repoId = selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    newModelObject.setData("repository", selectedOption.name);
    newModelObject.setData("repoId", repoId);
    newModelObject.setData("projectId", repoId);
    newModelObject.setData("sshUrl", selectedOption.sshUrl || "");
    newModelObject.setData("gitUrl", gitUrl);
    setModel({...newModelObject});
  };
  const clearDataFunction=(fieldName)=>{
    let newModelObject = {...model};
    newModelObject.setData("repository", '');
    newModelObject.setData("repoId", '');
    newModelObject.setData("projectId", '');
    newModelObject.setData("sshUrl", '');
    newModelObject.setData("gitUrl", '');
    setModel({...newModelObject});
  };

  if(!model) {
    return null;
  }

  return (
     <RepositorySelectInput
       fieldName={"repository"}
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