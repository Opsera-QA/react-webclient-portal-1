import React from "react";
import PropTypes from "prop-types";
import GitBranchMultiSelectInput from "components/common/list_of_values_input/tools/git/GitBranchMultiSelectInput";

function PipelineSourceRepositorySecondaryBranchesMultiSelectInput({className, fieldName, model, setModel, disabled, primaryBranch}) {
  const getDisabledBranch = () => {
    if (disabled === true || primaryBranch == null || primaryBranch === "") {
      return true;
    }

    return [primaryBranch];
  };

  return (
    <GitBranchMultiSelectInput
      repoId={model?.getData("repoId")}
      service={model?.getData("service")}
      gitToolId={model?.getData("accountId")}
      workspace={model?.getData("workspace")}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
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