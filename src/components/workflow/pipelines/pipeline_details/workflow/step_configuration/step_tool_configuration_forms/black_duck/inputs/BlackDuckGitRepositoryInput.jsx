import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function BlackDuckGitRepositoryInput({model, setModel, disabled}) {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    const repoId = selectedOption?._id || selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    const sshUrl = selectedOption?.sshUrl || selectedOption?.configuration?.sshUrl || "";
    newModel.setData("gitRepository", selectedOption.name);
    newModel.setData("gitRepositoryID", repoId);
    newModel.setData("sshUrl", sshUrl);
    newModel.setData("gitUrl", gitUrl);
    newModel.setDefaultValue("defaultBranch");
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    let newModel = {...model};
    newModel.setDefaultValue("gitRepository");
    newModel.setDefaultValue("gitRepositoryID");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("defaultBranch");
    setModel({...newModel});
  };

  return (
     <RepositorySelectInput
       fieldName={"gitRepository"}
       service={model.getData("type")}
       gitToolId={model.getData("gitToolId")}
       workspace={model.getData("workspace")}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setDataFunction}
       clearDataFunction={clearDataFunction}
       disabled={disabled}
     />
  );
}

BlackDuckGitRepositoryInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BlackDuckGitRepositoryInput;