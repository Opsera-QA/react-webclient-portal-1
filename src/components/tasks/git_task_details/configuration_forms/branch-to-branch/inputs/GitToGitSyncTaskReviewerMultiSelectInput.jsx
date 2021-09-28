import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import GitReviewerMultiSelectInput from "components/common/list_of_values_input/tools/git/GitReviewerMultiSelectInput";

function GitToGitSyncTaskReviewerMultiSelectInput({model, setModel, disabled, service, toolId, workspace, repository, autoApprove}) {
  // TODO: Wire up dynamic requirements
  useEffect(() => {
    setRequired(true, 1);
    return () => {
      setRequired(false, null);
      clearReviewer();
    };
  }, []);

  const setReviewer = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("reviewers", selectedOption.map(option => option.reviewerId));
    newDataObject.setData("reviewerNames", selectedOption.map(option => option.reviewerName));
    setModel({...newDataObject});
  };

  const clearReviewer = () => {
    let newDataObject = {...model};
    newDataObject.setData("reviewers", []);
    newDataObject.setData("reviewerNames", []);
    setModel({...newDataObject});
  };

  const setRequired = (isRequired, minItems) => {
    let newDataObject = {...model};
    newDataObject.getFieldById("reviewerNames").isRequired = isRequired;
    newDataObject.getFieldById("reviewerNames").minItems = minItems;
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
      setDataFunction={setReviewer}
      clearDataFunction={clearReviewer}
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