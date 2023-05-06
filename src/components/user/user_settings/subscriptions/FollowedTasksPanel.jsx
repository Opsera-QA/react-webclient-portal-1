import React from "react";
import PropTypes from "prop-types";
import TaskCardView from "components/tasks/TaskCardView";
import useGetTasks from "hooks/workflow/tasks/useGetTasks";

export default function FollowedTasksPanel({className}) {
  const {
    tasks,
    isLoading,
    error,
  } = useGetTasks(
    undefined,
    false,
    undefined,
    true,
  );

  return (
    <div className={className}>
      <TaskCardView
        taskData={tasks}
        isLoading={isLoading}
        noDataMessage={"You are not currently following any Tasks"}
        error={error}
      />
    </div>
  );
}

FollowedTasksPanel.propTypes = {
  className: PropTypes.string
};
