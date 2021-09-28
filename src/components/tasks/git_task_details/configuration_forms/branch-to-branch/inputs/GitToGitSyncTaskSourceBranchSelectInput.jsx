import React from 'react';
import PropTypes from 'prop-types';
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function GitToGitSyncTaskSourceBranchSelectInput({model, setModel, disabled, targetBranch}) {
  const setSourceBranch = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("sourceBranch", selectedOption);
    setModel({...model});
  };

  const getDisabledOptions = () => {
    if (disabled === true) {
      return true;
    }

    if (targetBranch != null && targetBranch !== "") {
      return [targetBranch];
    }
  };

  return (
    <GitBranchInput
      fieldName={"sourceBranch"}
      service={model.getData("service")}
      gitToolId={model.getData("gitToolId")}
      workspace={model.getData("workspace")}
      repoId={model.getData("projectId")}
      dataObject={model}
      setDataFunction={setSourceBranch}
      setDataObject={setModel}
      disabled={getDisabledOptions()}
    />
  );
}

GitToGitSyncTaskSourceBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  targetBranch: PropTypes.string,
};

export default GitToGitSyncTaskSourceBranchSelectInput;