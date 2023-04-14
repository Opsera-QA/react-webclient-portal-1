import React from "react";
import PropTypes from "prop-types";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import WorkspaceTaskCard from "components/workspace/cards/WorkspaceTaskCard";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";

export default function WorkspaceTaskCardView(
  {
    tasks,
    taskFilterModel,
    loadData,
    isLoading,
  }) {
  const getTaskCard = (task) => {
    return (
      <WorkspaceTaskCard
        task={task}
        taskMetadata={tasksMetadata}
      />
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
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
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};