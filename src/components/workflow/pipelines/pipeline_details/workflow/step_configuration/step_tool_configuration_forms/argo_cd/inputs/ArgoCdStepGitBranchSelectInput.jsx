import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function ArgoCdStepGitBranchSelectInput({className, fieldName, model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = model;
    newModel.setData("defaultBranch", selectedOption || "");
    setModel({ ...newModel });
  };

  return (
    <GitBranchInput
      repoId={model?.getData("gitRepositoryID")}
      service={model?.getData("type")}
      gitToolId={model?.getData("gitToolId")}
      workspace={model?.getData("bitbucketWorkspace")}
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
      className={className}
    />
  );
}

ArgoCdStepGitBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};

ArgoCdStepGitBranchSelectInput.defaultProps = {
  fieldName: "defaultBranch",
};

export default ArgoCdStepGitBranchSelectInput;