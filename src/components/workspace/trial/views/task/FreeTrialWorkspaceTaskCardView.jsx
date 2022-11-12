import React from "react";
import PropTypes from "prop-types";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import WorkspaceTaskCard from "components/workspace/cards/WorkspaceTaskCard";

export default function FreeTrialWorkspaceTaskCardView(
  {
    tasks,
    taskFilterModel,
    loadData,
    isLoading,
    taskMetadata,
  }) {
  const getTaskCard = (task) => {
    return (
      <WorkspaceTaskCard
        task={task}
        taskMetadata={taskMetadata}
      />
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading || taskMetadata == null}
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

FreeTrialWorkspaceTaskCardView.propTypes = {
  tasks: PropTypes.array,
  taskFilterModel: PropTypes.object,
  taskMetadata: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};