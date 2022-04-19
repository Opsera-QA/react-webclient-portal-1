import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";
import { hasStringValue } from "components/common/helpers/string-helpers";

function GitToGitMergeSyncTaskSourceBranchSelectInput({
  model,
  setModel,
  disabled,
  targetBranch,
}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = { ...model };
    newModel.setData("sourceBranch", selectedOption);
    setModel({ ...model });
  };

  const getDisabledOptions = () => {
    if (disabled === true) {
      return true;
    }

    if (hasStringValue(targetBranch) === true) {
      return [targetBranch];
    }
  };

  return (
    <GitBranchInput
      fieldName={"sourceBranch"}
      service={model.getData("service")}
      gitToolId={model.getData("toolId")}
      workspace={model.getData("workspace")}
      repoId={model.getData("repoId")}
      dataObject={model}
      setDataFunction={setDataFunction}
      setDataObject={setModel}
      disabled={getDisabledOptions()}
    />
  );
}

GitToGitMergeSyncTaskSourceBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  targetBranch: PropTypes.string,
};

export default GitToGitMergeSyncTaskSourceBranchSelectInput;
