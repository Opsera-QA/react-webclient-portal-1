import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/git/RepositorySelectInput";

function SonarStepRepositorySelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setData("repository", selectedOption?.name);
    newModel.setData("repoId", selectedOption?.id);
    newModel.setData("projectId", selectedOption?.id);
    newModel.setData("sshUrl", selectedOption?.sshUrl);
    newModel.setData("gitUrl", selectedOption?.httpUrl);
    newModel.setDefaultValue("branch");
    newModel.setDefaultValue("defaultBranch");
    newModel.setDefaultValue("gitBranch");
    setModel({...newModel});
  };

  return (
    <RepositorySelectInput
      fieldName={"repository"}
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