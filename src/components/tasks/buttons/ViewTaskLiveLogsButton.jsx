import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faTerminal} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import {TASK_TYPES} from "components/tasks/task.types";
import TaskLiveLogsOverlay from "components/tasks/TaskLiveLogsOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";

const ALLOWED_TASK_TYPES = [
  TASK_TYPES.SYNC_SALESFORCE_REPO,
  // TASK_TYPES.SALESFORCE_QUICK_DEPLOY,
  // TASK_TYPES.SALESFORCE_BULK_MIGRATION,
];

function ViewTaskLiveLogsButton({taskModel, className, taskType, disabled }) {
  const toastContext = useContext(DialogToastContext);

  const showLiveLogs = () => {
    toastContext.showOverlayPanel(
      <TaskLiveLogsOverlay
        runCount={taskModel?.getData("run_count")}
        taskId={taskModel?.getData("_id")}
      />
    );
  };

  if (!ALLOWED_TASK_TYPES.includes(taskType)) {
    return null;
  }

  return (
    <div className={className}>
      <Button
        variant="secondary"
        onClick={showLiveLogs}
        disabled={disabled}
        size={"md"}
      >
        <IconBase
          icon={faTerminal}
          className="white mr-2"
        />
        View Live Logs
      </Button>
    </div>
  );
}

ViewTaskLiveLogsButton.propTypes = {
  taskModel: PropTypes.object,
  className: PropTypes.string,
  taskType: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ViewTaskLiveLogsButton;