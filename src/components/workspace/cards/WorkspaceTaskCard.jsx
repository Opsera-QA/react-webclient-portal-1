import PropTypes from "prop-types";
import React from "react";
import modelHelpers from "components/common/model/modelHelpers";
import { useHistory } from "react-router-dom";
import TaskCardBase from "temp-library-components/cards/tasks/TaskCardBase";
import { taskHelper } from "components/tasks/task.helper";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import {workspaceHelper} from "components/workspace/workspace.helper";

export default function WorkspaceTaskCard(
  {
    task,
  }) {
  const history = useHistory();

  const onClickFunction = () => {
    history.push(workspaceHelper.getWorkspaceItemDetailLink(task));
  };

  return (
    <TaskCardBase
      taskModel={modelHelpers.parseObjectIntoModel(task, tasksMetadata)}
      onClickFunction={onClickFunction}
      tooltip={"Click to view Task"}
    />
  );
}

WorkspaceTaskCard.propTypes = {
  task: PropTypes.object,
};