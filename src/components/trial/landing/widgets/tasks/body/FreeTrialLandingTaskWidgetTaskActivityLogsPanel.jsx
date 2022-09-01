import React from "react";
import PropTypes from "prop-types";
import TaskActivityPanel from "components/tasks/activity_logs/TaskActivityPanel";

export default function FreeTrialLandingTaskWidgetTaskActivityLogsPanel(
  {
    taskModel,
    className,
  }) {
  if (taskModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <TaskActivityPanel
        taskModel={taskModel}
        showFilterContainerIcon={false}
      />
    </div>
  );
}

FreeTrialLandingTaskWidgetTaskActivityLogsPanel.propTypes = {
  taskModel: PropTypes.object,
  className: PropTypes.string,
};