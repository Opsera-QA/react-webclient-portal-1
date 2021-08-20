import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function PipelineSourceRepositoryGitBranchSelectInput({className, fieldName, model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = model;
    newModel.setData("branch", selectedOption);
    setModel({...newModel});
  };

  return (
    <GitBranchInput
      repoId={model?.getData("repoId")}
      service={model?.getData("service")}
      gitToolId={model?.getData("accountId")}
      workspace={model?.getData("workspace")}
      setDataFunction={setDataFunction}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
      className={className}
    />
  );
}

PipelineSourceRepositoryGitBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};

PipelineSourceRepositoryGitBranchSelectInput.defaultProps = {
  fieldName: "branch",
};

export default PipelineSourceRepositoryGitBranchSelectInput;