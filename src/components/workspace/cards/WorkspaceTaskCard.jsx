import PropTypes from "prop-types";
import React from "react";
import modelHelpers from "components/common/model/modelHelpers";
import { useHistory } from "react-router-dom";
import TaskCardBase from "temp-library-components/cards/TaskCardBase";

export default function WorkspaceTaskCard(
  {
    task,
    taskMetadata,
  }) {
  const history = useHistory();

  const viewTaskFunction = (taskId) => {
    history.push(`/task/details/${taskId}`);
  };

  return (
    <TaskCardBase
      taskModel={modelHelpers.parseObjectIntoModel(task, taskMetadata)}
      onClickFunction={() => viewTaskFunction(task?._id)}
      tooltip={"Click to view Task"}
    />
  );
}

WorkspaceTaskCard.propTypes = {
  task: PropTypes.object,
  taskMetadata: PropTypes.object,
};