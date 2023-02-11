import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
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
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    if (taskModel) {
      setInternalTaskModel({...taskModel});
    }
  }, [taskModel]);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (currentScreen === GIT_TO_GIT_SYNC_TASK_INITIALIZATION_SCREENS.PRE_RUN_TASK_SCREEN) {
      return (
        <GitToGitSyncTaskPreRunTaskScreen
          setCurrentScreen={setCurrentScreen}
          taskModel={internalTaskModel}
          setTaskModel={setInternalTaskModel}
          className={"m-3"}
        />
      );
    }

    return (
      <GitToGitSyncTaskRunTaskConfirmationScreen
        taskModel={taskModel}
        handleClose={closePanel}
      />
    );
  };


  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Git to Git Sync Task Initialization`}
      titleIcon={faFileInvoice}
      showToasts={true}
      showCloseButton={false}
    >
      {getBody()}
    </FullScreenCenterOverlayContainer>
  );
}

GitToGitSyncTaskInitializationOverlay.propTypes = {
  taskModel: PropTypes.object
};
