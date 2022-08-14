import React from "react";
import PropTypes from "prop-types";
import TaskCard from "components/common/fields/tasks/TaskCard";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import TaskModel from "components/tasks/task.model";

export default function WorkspaceTaskCardView(
  {
    tasks,
    taskFilterModel,
    loadData,
    isLoading,
    taskMetadata,
  }) {
  const getTaskCard = (task) => {
    return (
      <TaskCard
        taskModel={new TaskModel({...task}, taskMetadata, false)}
      />
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={taskFilterModel}
      className={"makeup-container-table m-2"}
      cards={
        <VerticalCardViewBase
          getCardFunction={getTaskCard}
          data={tasks}
        />
      }
    />
  );
}

WorkspaceTaskCardView.propTypes = {
  tasks: PropTypes.array,
  taskFilterModel: PropTypes.object,
  taskMetadata: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};