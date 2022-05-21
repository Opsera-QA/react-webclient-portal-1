import React, {useContext} from "react";
import PropTypes from "prop-types";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import TaskNotificationEditorPanel from "components/tasks/details/tasks/notifications/TaskNotificationEditorPanel";

function TaskNotificationConfigurationOverlay(
  {
    task,
    taskId,
    loadDataFunction,
  }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
    loadDataFunction();
  };

  if (task == null || isMongoDbId(taskId) !== true) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Task Completion Notification Configuration`}
      titleIcon={faEnvelope}
      showToasts={true}
      showCloseButton={false}
    >
      <div className={"p-3"}>
        <TaskNotificationEditorPanel
          taskId={taskId}
          task={task}
          handleCloseClick={closePanel}
        />
      </div>
    </CenterOverlayContainer>
  );
}

TaskNotificationConfigurationOverlay.propTypes = {
  task: PropTypes.object,
  taskId: PropTypes.string,
  loadDataFunction: PropTypes.func,
};

export default TaskNotificationConfigurationOverlay;