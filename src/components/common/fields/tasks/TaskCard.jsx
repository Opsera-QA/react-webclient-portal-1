import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import TaskCardBase from "temp-library-components/cards/tasks/TaskCardBase";
import { taskHelper } from "components/tasks/task.helper";

export default function TaskCard(
  {
    taskModel,
  }) {
  const history = useHistory();

  const onClickFunction = () => {
    history.push(taskHelper.getDetailViewLink(taskModel?.getMongoDbId()));
  };

  return (
    <TaskCardBase
      taskModel={taskModel}
      onClickFunction={onClickFunction}
      tooltip={"Click to view Task"}
    />
  );
}

TaskCard.propTypes = {
  taskModel: PropTypes.object,
};