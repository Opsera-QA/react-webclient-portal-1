import React from "react";
import PropTypes from "prop-types";
import { TASK_TYPES } from "components/tasks/task.types";
import GitToGitMergeSyncTaskFileSelectionFieldSelectInput
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/rules/file_selection/GitToGitMergeSyncTaskFileSelectionFieldSelectInput";
import SalesforceToGitMergeSyncTaskFileSelectionFieldSelectInput
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/rules/file_selection/SalesforceToGitMergeSyncTaskFileSelectionFieldSelectInput";

function MergeSyncTaskFileSelectionFieldSelectInput({model, setModel}) {
  switch (model?.getData("taskType")) {
    case TASK_TYPES.GIT_TO_GIT_MERGE_SYNC:
      return (
        <GitToGitMergeSyncTaskFileSelectionFieldSelectInput
          model={model}
          setModel={setModel}
        />
      );
    case TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC:
      return (
        <SalesforceToGitMergeSyncTaskFileSelectionFieldSelectInput
          model={model}
          setModel={setModel}
        />
      );
    default:
      return null;
  }
}

MergeSyncTaskFileSelectionFieldSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default MergeSyncTaskFileSelectionFieldSelectInput;