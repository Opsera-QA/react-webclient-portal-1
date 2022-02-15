import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function CypressStepRepositorySelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("repository", selectedOption?.name);
    newModel.setData("repoId", selectedOption?.id);
    newModel.setData("projectId", selectedOption?.id);
    newModel.setData("gitUrl", selectedOption?.httpUrl || "");
    newModel.setData("sshUrl", selectedOption?.sshUrl || "");
    newModel.setData("branch", "");
    newModel.setData("defaultBranch", "");
    newModel.setData("gitBranch", "");
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

CypressStepRepositorySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CypressStepRepositorySelectInput;