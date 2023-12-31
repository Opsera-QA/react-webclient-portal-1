import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function SonarStepRepositorySelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    const repoId = selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    newModel.setData("repository", selectedOption?.name);
    newModel.setData("repoId", repoId);
    newModel.setData("projectId", selectedOption?.id);
    newModel.setData("sshUrl", selectedOption?.sshUrl);
    newModel.setData("gitUrl", gitUrl);
    newModel.setDefaultValue("branch");
    newModel.setDefaultValue("defaultBranch");
    newModel.setDefaultValue("gitBranch");
    setModel({...newModel});
  };

  return (
    <RepositorySelectInput
      fieldName={"repoId"}
      service={model?.getData("service")}
      gitToolId={model?.getData("gitToolId")}
      workspace={model?.getData("workspace")}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

SonarStepRepositorySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SonarStepRepositorySelectInput;