import React from 'react';
import PropTypes from 'prop-types';
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function GitToGitSyncTaskDestinationBranchSelectInput({model, setModel, disabled, sourceBranch,}) {
  const setDestinationBranch = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("gitBranch", selectedOption);
    newDataObject.setData("defaultBranch", selectedOption);
    setModel({...newDataObject});
  };

  const getDisabledOptions = () => {
    if (disabled === true) {
      return true;
    }

    if (sourceBranch != null && sourceBranch !== "") {
      return [sourceBranch];
    }
  };

  return (
    <GitBranchInput
      fieldName={"gitBranch"}
      service={model.getData("service")}
      gitToolId={model.getData("gitToolId")}
      workspace={model.getData("workspace")}
      repoId={model.getData("projectId")}
      dataObject={model}
      setDataFunction={setDestinationBranch}
      setDataObject={setModel}
      disabled={getDisabledOptions()}
    />
  );
}

GitToGitSyncTaskDestinationBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  sourceBranch: PropTypes.string,
};

export default GitToGitSyncTaskDestinationBranchSelectInput;