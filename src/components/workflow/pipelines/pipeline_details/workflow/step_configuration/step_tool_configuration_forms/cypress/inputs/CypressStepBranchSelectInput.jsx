import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function CypressStepBranchSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("branch", selectedOption);
    newModel.setData("defaultBranch", selectedOption);
    newModel.setData("gitBranch", selectedOption);
    setModel({...newModel});
  };

  return (
    <GitBranchInput
      fieldName={"branch"}
      repoId={model?.getData("repoId")}
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

CypressStepBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CypressStepBranchSelectInput;