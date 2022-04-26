import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";
import { hasStringValue } from "components/common/helpers/string-helpers";

function GitToGitMergeSyncTaskTargetBranchSelectInput({
  model,
  setModel,
  disabled,
  sourceBranch,
}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = { ...model };
    newModel.setData("targetBranch", selectedOption);
    setModel({ ...newModel });
  };

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
      fieldName={"targetBranch"}
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

GitToGitMergeSyncTaskTargetBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  sourceBranch: PropTypes.string,
};

export default GitToGitMergeSyncTaskTargetBranchSelectInput;
