import PropTypes from "prop-types";
import React from "react";
import modelHelpers from "components/common/model/modelHelpers";
import { useHistory } from "react-router-dom";
import TaskCardBase from "temp-library-components/cards/tasks/TaskCardBase";
import { taskHelper } from "components/tasks/task.helper";

export default function WorkspaceTaskCard(
  {
    task,
    taskMetadata,
  }) {
  const history = useHistory();

  const onClickFunction = () => {
    history.push(taskHelper.getDetailViewLink(task?._id));
  };

  return (
    <TaskCardBase
      taskModel={modelHelpers.parseObjectIntoModel(task, taskMetadata)}
      onClickFunction={onClickFunction}
      tooltip={"Click to view Task"}
    />
  );
}

WorkspaceTaskCard.propTypes = {
  task: PropTypes.object,
  taskMetadata: PropTypes.object,
};