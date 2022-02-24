import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function SentenialGitRepositorySelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    const repoId = selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    newModel.setData("repository", selectedOption?.name);
    newModel.setData("repoId", repoId);
    newModel.setData("sshUrl", selectedOption?.sshUrl || "");
    newModel.setData("gitUrl", gitUrl);
    setModel({...newModel});
  };

  return (
     <RepositorySelectInput
       fieldName={"repository"}
       service={model?.getData("service")}
       gitToolId={model?.getData("gitToolId")}
       workspace={model?.getData("bitbucketWorkspace")}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setDataFunction}
       disabled={disabled}
     />
  );
}

SentenialGitRepositorySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SentenialGitRepositorySelectInput;