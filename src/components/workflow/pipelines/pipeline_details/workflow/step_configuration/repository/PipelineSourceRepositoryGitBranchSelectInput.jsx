import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function PipelineSourceRepositoryGitBranchSelectInput({className, fieldName, model, setModel, disabled}) {
  return (
    <GitBranchInput
      repoId={model?.getData("gitRepositoryID")}
      service={model?.getData("type")}
      gitToolId={model?.getData("gitToolId")}
      workspace={model?.getData("bitbucketWorkspace")}
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