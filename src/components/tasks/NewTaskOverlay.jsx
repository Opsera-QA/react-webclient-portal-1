import React, { useContext } from "react";
import PropTypes from "prop-types";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import TaskEditorPanel from "components/tasks/details/TaskEditorPanel";
import useGetNewTaskModel from "components/tasks/hooks/useGetNewTaskModel";

export default function NewTaskOverlay(
  {
    loadData,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { taskModel, setTaskModel } = useGetNewTaskModel();

  const closePanel = () => {
    if (isMounted?.current === true) {
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
      />
    </CreateCenterPanel>
  );
}

NewTaskOverlay.propTypes = {
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
};