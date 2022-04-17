import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function GitToGitMergeSyncTaskUpstreamBranchSelectInput({
  model,
  setModel,
  disabled,
}) {
  return (
    <GitBranchInput
      fieldName={"upstreamBranch"}
      service={model?.getData("service")}
      gitToolId={model?.getData("toolId")}
      workspace={model?.getData("workspace")}
      repoId={model?.getData("repository")}
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
      visible={model?.getData("isNewBranch") === true}
    />
  );
}

GitToGitMergeSyncTaskUpstreamBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GitToGitMergeSyncTaskUpstreamBranchSelectInput;
