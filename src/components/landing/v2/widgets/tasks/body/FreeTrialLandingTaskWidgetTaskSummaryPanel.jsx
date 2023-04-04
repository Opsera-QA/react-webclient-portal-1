import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import TaskSummaryPanel from "components/tasks/details/TaskSummaryPanel";

export default function FreeTrialLandingTaskWidgetTaskSummaryPanel(
  {
    selectedTask,
    setSelectedTask,
    className,
    isLoading,
    setIsLoading,
  }) {
  const {
    accessRoleData,
  } = useComponentStateReference();

  if (selectedTask == null) {
    return null;
  }

  return (
    <div className={className}>
      <TaskSummaryPanel
        accessRoleData={accessRoleData}
        gitTasksData={selectedTask}
        setGitTasksData={setSelectedTask}
      />
    </div>
  );
}

FreeTrialLandingTaskWidgetTaskSummaryPanel.propTypes = {
  selectedTask: PropTypes.object,
  setSelectedTask: PropTypes.func,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
  className: PropTypes.string,
};