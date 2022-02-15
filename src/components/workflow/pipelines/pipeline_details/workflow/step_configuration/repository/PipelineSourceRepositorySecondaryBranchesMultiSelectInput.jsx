import React from "react";
import PropTypes from "prop-types";
import RepositoryBranchMultiSelectInputBase from "components/common/list_of_values_input/tools/git/RepositoryBranchMultiSelectInputBase";

function PipelineSourceRepositorySecondaryBranchesMultiSelectInput({className, fieldName, model, setModel, disabled, primaryBranch}) {
  const getDisabledBranch = () => {
    if (disabled === true || primaryBranch == null || primaryBranch === "") {
      return true;
    }

    return [primaryBranch];
  };

  return (
    <RepositoryBranchMultiSelectInputBase
      repoId={model?.getData("repoId")}
      toolIdentifier={model?.getData("service")}
      toolId={model?.getData("accountId")}
      workspace={model?.getData("workspace")}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      disabled={getDisabledBranch()}
      className={className}
    />
  );
}

PipelineSourceRepositorySecondaryBranchesMultiSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  primaryBranch: PropTypes.string,
};

PipelineSourceRepositorySecondaryBranchesMultiSelectInput.defaultProps = {
  fieldName: "secondary_branches",
};

export default PipelineSourceRepositorySecondaryBranchesMultiSelectInput;