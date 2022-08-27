import PropTypes from "prop-types";
import React from "react";
import modelHelpers from "components/common/model/modelHelpers";
import TaskCardBase from "temp-library-components/cards/tasks/TaskCardBase";

export default function WorkflowTaskCard(
  {
    task,
    taskMetadata,
    setSelectedFlow,
    selectedFlow,
  }) {
  return (
    <TaskCardBase
      taskModel={modelHelpers.parseObjectIntoModel(task, taskMetadata)}
      onClickFunction={setSelectedFlow}
      // tooltip={"Click to view Task"}
      selectedOption={selectedFlow}
      option={task?._id}
    />
  );
}

WorkflowTaskCard.propTypes = {
  task: PropTypes.object,
  taskMetadata: PropTypes.object,
  setSelectedFlow: PropTypes.func,
  selectedFlow: PropTypes.string,
};