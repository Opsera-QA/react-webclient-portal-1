import React, { useContext } from "react";
import PropTypes from "prop-types";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import TaskEditorPanel from "components/tasks/details/TaskEditorPanel";
import useGetNewTaskModel from "components/tasks/hooks/useGetNewTaskModel";

export default function NewTaskOverlay(
  {
    loadData,
    backButtonFunction,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { taskModel, setTaskModel } = useGetNewTaskModel();

  const closePanel = (manualClose) => {
    if (manualClose !== false && loadData) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (taskModel == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      objectType={"Task"}
      loadData={loadData}
      closePanel={closePanel}
    >
      <TaskEditorPanel
        taskData={taskModel}
        handleClose={closePanel}
        backButtonFunction={backButtonFunction}
      />
    </CreateCenterPanel>
  );
}

NewTaskOverlay.propTypes = {
  loadData: PropTypes.func,
  backButtonFunction: PropTypes.func,
};