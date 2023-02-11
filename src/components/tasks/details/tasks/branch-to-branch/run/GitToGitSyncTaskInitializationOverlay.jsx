import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import GitToGitSyncTaskRunTaskConfirmationScreen
  from "components/tasks/details/tasks/branch-to-branch/run/GitToGitSyncTaskRunTaskConfirmationScreen";
import GitToGitSyncTaskPreRunTaskScreen
  from "components/tasks/details/tasks/branch-to-branch/run/GitToGitSyncTaskPreRunTaskScreen";

export const GIT_TO_GIT_SYNC_TASK_INITIALIZATION_SCREENS = {
  PRE_RUN_TASK_SCREEN: "pre_run_task_screen",
  TASK_WIZARD: "task_wizard",
};

export default function GitToGitSyncTaskInitializationOverlay({ taskModel }) {
  const [currentScreen, setCurrentScreen] = useState(GIT_TO_GIT_SYNC_TASK_INITIALIZATION_SCREENS.PRE_RUN_TASK_SCREEN);
  const [internalTaskModel, setInternalTaskModel] = useState(undefined);

  useEffect(() => {
    if (taskModel) {
      setInternalTaskModel({...taskModel});
    }
  }, [taskModel]);

  if (currentScreen === GIT_TO_GIT_SYNC_TASK_INITIALIZATION_SCREENS.PRE_RUN_TASK_SCREEN) {
    return (
      <GitToGitSyncTaskPreRunTaskScreen
        setCurrentScreen={setCurrentScreen}
        taskModel={internalTaskModel}
        setTaskModel={setInternalTaskModel}
      />
    );
  }

  return (
    <GitToGitSyncTaskRunTaskConfirmationScreen
      taskModel={taskModel}
    />
  );

}

GitToGitSyncTaskInitializationOverlay.propTypes = {
  taskModel: PropTypes.object
};
