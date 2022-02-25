import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function SonarStepBranchSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setData("gitBranch", selectedOption);
    newModel.setData("defaultBranch", selectedOption);
    newModel.setData("branch", selectedOption);
    setModel({...newModel});
  };

  return (
    <GitBranchInput
      fieldName={"branch"}
      service={model?.getData("service")}
      gitToolId={model?.getData("gitToolId")}
      workspace={model?.getData("workspace")}
      repoId={model?.getData("repoId")}
      dataObject={model}
      setDataFunction={setDataFunction}
      setDataObject={setModel}
      disabled={disabled}
    />
  );
}

SonarStepBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SonarStepBranchSelectInput;