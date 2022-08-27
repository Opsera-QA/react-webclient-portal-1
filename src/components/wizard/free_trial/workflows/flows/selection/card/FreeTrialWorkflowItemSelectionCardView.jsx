import React from "react";
import PropTypes from "prop-types";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import { workspaceConstants } from "components/workspace/workspace.constants";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import WorkspacePipelineCard from "components/workspace/cards/WorkspacePipelineCard";
import WorkspaceTaskCard from "components/workspace/cards/WorkspaceTaskCard";

export default function FreeTrialWorkflowItemSelectionCardView(
  {
    workflowFilterModel,
    workspaceItems,
    loadData,
    isLoading,
    taskMetadata,
  }) {
  const getWorkspaceItemCard = (workspaceItem) => {
    switch (workspaceItem?.workspaceType) {
      case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
        return (
          <WorkspacePipelineCard
            pipeline={workspaceItem}
          />
        );
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
        return (
          <WorkspaceTaskCard
            task={workspaceItem}
            taskMetadata={taskMetadata}
          />
        );
    }
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={workflowFilterModel}
      cards={
        <VerticalCardViewBase
          getCardFunction={getWorkspaceItemCard}
          data={workspaceItems}
        />
      }
    />
  );
}

FreeTrialWorkflowItemSelectionCardView.propTypes = {
  workspaceItems: PropTypes.array,
  workflowFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  taskMetadata: PropTypes.object,
};