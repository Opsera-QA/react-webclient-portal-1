import React from 'react';
import PropTypes from 'prop-types';
import GitReviewerMultiSelectInput from "components/common/list_of_values_input/tools/git/GitReviewerMultiSelectInput";

function GitToGitSyncTaskReviewerMultiSelectInput({model, setModel, disabled, service, toolId, workspace, repository, autoApprove}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("reviewers", selectedOption.map(option => option.reviewerId));
    newDataObject.setData("reviewerNames", selectedOption.map(option => option.reviewerName));
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData("reviewers", []);
    newDataObject.setData("reviewerNames", []);
    setModel({...newDataObject});
  };

  if (autoApprove !== true) {
    return null;
  }

  return (
    <GitReviewerMultiSelectInput
      fieldName={"reviewerNames"}
      service={service}
      gitToolId={toolId}
      workspace={workspace}
      repository={repository}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
}

GitToGitSyncTaskReviewerMultiSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  service: PropTypes.string,
  toolId: PropTypes.string,
  workspace: PropTypes.string,
  repository: PropTypes.string,
  autoApprove: PropTypes.bool,
};

export default GitToGitSyncTaskReviewerMultiSelectInput;