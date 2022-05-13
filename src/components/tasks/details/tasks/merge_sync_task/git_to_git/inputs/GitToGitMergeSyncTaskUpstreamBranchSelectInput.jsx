import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";
import { hasStringValue } from "components/common/helpers/string-helpers";

function GitToGitMergeSyncTaskUpstreamBranchSelectInput(
  {
    model,
    setModel,
    setDataFunction,
    sourceBranch,
    disabled,
  }) {
  const getDisabledOptions = () => {
    if (disabled === true) {
      return true;
    }

    if (hasStringValue(sourceBranch) === true) {
      return [sourceBranch];
    }
  };

  return (
    <GitBranchInput
      fieldName={"upstreamBranch"}
      service={model?.getData("service")}
      gitToolId={model?.getData("toolId")}
      workspace={model?.getData("workspace")}
      repoId={model?.getData("repoId")}
      dataObject={model}
      setDataFunction={setDataFunction}
      setDataObject={setModel}
      disabled={getDisabledOptions()}
    />
  );
}

GitToGitMergeSyncTaskUpstreamBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  sourceBranch: PropTypes.string,
  disabled: PropTypes.bool,
};

export default GitToGitMergeSyncTaskUpstreamBranchSelectInput;
